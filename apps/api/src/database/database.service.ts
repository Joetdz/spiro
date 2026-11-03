import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, type QueryResultRow } from 'pg';

// Schéma créé au démarrage s'il n'existe pas encore.
const SCHEMA = `
  CREATE TABLE IF NOT EXISTS leads (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    kind        text NOT NULL CHECK (kind IN ('interet', 'contact')),
    name        text NOT NULL,
    phone       text NOT NULL,
    commune     text,
    message     text,
    created_at  timestamptz NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS test_rides (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    phone           text NOT NULL,
    commune         text NOT NULL,
    preferred_date  date NOT NULL,
    activity        text NOT NULL,
    created_at      timestamptz NOT NULL DEFAULT now()
  );
`;

const RETRY_DELAY_MS = 15_000;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly pool: Pool;
  private retryTimer?: NodeJS.Timeout;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL manquant : voir apps/api/.env.example');
    this.pool = new Pool({ connectionString, max: 5, connectionTimeoutMillis: 10_000 });
    // Une connexion inactive coupée par le réseau ne doit pas faire planter l'API.
    this.pool.on('error', (err) => this.logger.warn(`Connexion perdue : ${err.message}`));
  }

  // Ne bloque pas le démarrage : si la base est injoignable (coupure réseau),
  // l'API démarre quand même et réessaie de créer le schéma en arrière-plan.
  onModuleInit() {
    void this.ensureSchema();
  }

  private async ensureSchema() {
    try {
      await this.pool.query(SCHEMA);
      this.logger.log('Base de données prête');
    } catch (err) {
      this.logger.warn(`Base injoignable (${(err as Error).message}), nouvel essai dans ${RETRY_DELAY_MS / 1000} s`);
      this.retryTimer = setTimeout(() => void this.ensureSchema(), RETRY_DELAY_MS);
    }
  }

  async onModuleDestroy() {
    clearTimeout(this.retryTimer);
    await this.pool.end();
  }

  async query<T extends QueryResultRow>(sql: string, params: unknown[] = []): Promise<T[]> {
    const { rows } = await this.pool.query<T>(sql, params);
    return rows;
  }
}
