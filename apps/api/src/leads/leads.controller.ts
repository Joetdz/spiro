import { Body, Controller, Get, Headers, Post, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import type { CreatedResponse } from '@spiro/shared';
import { CreateLeadDto, CreateTestRideDto } from './leads.dto';
import { LeadsService } from './leads.service';

/** Base injoignable : message clair pour le visiteur plutôt qu'une erreur 500. */
async function unavailableOnDbError<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch {
    throw new ServiceUnavailableException(
      'Service momentanément indisponible. Réessayez dans quelques minutes ou appelez-nous.',
    );
  }
}

@Controller()
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post('leads')
  async createLead(@Body() dto: CreateLeadDto): Promise<CreatedResponse> {
    const { id } = await unavailableOnDbError(this.leads.createLead(dto));
    return { id, message: 'Merci ! Un conseiller Spiro vous rappelle très vite.' };
  }

  @Post('test-rides')
  async createTestRide(@Body() dto: CreateTestRideDto): Promise<CreatedResponse> {
    const { id } = await unavailableOnDbError(this.leads.createTestRide(dto));
    return { id, message: 'Votre essai est réservé. Nous vous appelons pour confirmer l’heure.' };
  }

  /** Consultation des demandes : nécessite l'en-tête x-admin-key égal à ADMIN_KEY. */
  @Get('admin/requests')
  listRequests(@Headers('x-admin-key') key?: string) {
    const expected = process.env.ADMIN_KEY;
    if (!expected || key !== expected) throw new UnauthorizedException();
    return this.leads.listAll();
  }
}
