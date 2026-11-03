export interface Station {
  id: string;
  name: string;
  commune: string;
  address: string;
  hours: string;
  open24h: boolean;
  batteriesAvailable: number;
  lat: number;
  lng: number;
}

export interface Motorcycle {
  id: string;
  name: string;
  tagline: string;
  rangeKm: number;
  topSpeedKmh: number;
  peakPowerKw: number;
  payloadKg: number;
  features: string[];
}

export type PlanId = 'location-vente' | 'comptant' | 'flotte';

export interface Plan {
  id: PlanId;
  name: string;
  priceLabel: string;
  description: string;
  benefits: string[];
  highlighted?: boolean;
}

export interface Stat {
  label: string;
  value: string;
}

export type LeadKind = 'interet' | 'contact';

export interface LeadInput {
  kind: LeadKind;
  name: string;
  phone: string;
  commune?: string;
  message?: string;
}

export interface TestRideInput {
  name: string;
  phone: string;
  commune: string;
  preferredDate: string;
  activity: string;
}

export interface CreatedResponse {
  id: string;
  message: string;
}

export type ImpactIcon = 'distance' | 'co2' | 'energy' | 'swap';

export interface ImpactFigure {
  icon: ImpactIcon;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface NewsItem {
  id: string;
  date: string;
  source: string;
  title: string;
  summary: string;
  url: string;
}
