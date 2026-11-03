import { USD_TO_CDF } from './constants';

const cdf = new Intl.NumberFormat('fr-CD', { maximumFractionDigits: 0 });

export function formatCdf(amount: number): string {
  return `${cdf.format(Math.round(amount))} FC`;
}

export function formatUsd(amount: number): string {
  return `${amount.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} $`;
}

export function cdfToUsd(amount: number): number {
  return amount / USD_TO_CDF;
}

/** Normalise « 0812 345 678 », « 812345678 » ou « +243 812… » en +243XXXXXXXXX. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('243')) return `+${digits}`;
  if (digits.startsWith('0')) return `+243${digits.slice(1)}`;
  return `+243${digits}`;
}
