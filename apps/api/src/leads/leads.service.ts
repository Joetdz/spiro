import { Injectable, Logger } from '@nestjs/common';
import type { LeadInput, TestRideInput } from '@spiro/shared';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly db: DatabaseService) {}

  async createLead(data: LeadInput) {
    const [row] = await this.db.query<{ id: string }>(
      `INSERT INTO leads (kind, name, phone, commune, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [data.kind, data.name, data.phone, data.commune ?? null, data.message ?? null],
    );
    this.logger.log(`Nouveau contact (${data.kind}) : ${data.name} ${data.phone}`);
    return row;
  }

  async createTestRide(data: TestRideInput) {
    const [row] = await this.db.query<{ id: string }>(
      `INSERT INTO test_rides (name, phone, commune, preferred_date, activity)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [data.name, data.phone, data.commune, data.preferredDate, data.activity],
    );
    this.logger.log(`Nouvel essai : ${data.name} ${data.phone} le ${data.preferredDate}`);
    return row;
  }

  async listAll() {
    const [leads, testRides] = await Promise.all([
      this.db.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 500'),
      this.db.query(
        `SELECT id, name, phone, commune, to_char(preferred_date, 'YYYY-MM-DD') AS preferred_date, activity, created_at
         FROM test_rides ORDER BY created_at DESC LIMIT 500`,
      ),
    ]);
    return { leads, testRides };
  }
}
