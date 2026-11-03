import { KINSHASA_COMMUNES, RDC_PHONE_PATTERN, normalizePhone } from '@spiro/shared';
import type { LeadInput, LeadKind, TestRideInput } from '@spiro/shared';
import { Transform } from 'class-transformer';
import { IsIn, IsISO8601, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

const PHONE_MESSAGE = 'Numéro invalide : format attendu +243 suivi de 9 chiffres';
const toPhone = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? normalizePhone(value) : value;

export class CreateLeadDto implements LeadInput {
  @IsIn(['interet', 'contact'])
  kind: LeadKind;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @Transform(toPhone)
  @Matches(RDC_PHONE_PATTERN, { message: PHONE_MESSAGE })
  phone: string;

  @IsOptional()
  @IsIn(KINSHASA_COMMUNES)
  commune?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}

export class CreateTestRideDto implements TestRideInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @Transform(toPhone)
  @Matches(RDC_PHONE_PATTERN, { message: PHONE_MESSAGE })
  phone: string;

  @IsIn(KINSHASA_COMMUNES)
  commune: string;

  @IsISO8601({ strict: true })
  preferredDate: string;

  @IsIn(['taxi-moto', 'livraison', 'personnel', 'flotte'])
  activity: string;
}
