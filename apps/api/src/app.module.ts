import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { DatabaseModule } from './database/database.module';
import { LeadsModule } from './leads/leads.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, CatalogModule, LeadsModule],
  controllers: [HealthController],
})
export class AppModule {}
