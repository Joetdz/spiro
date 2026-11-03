import {
  FUEL_PRICE_CDF_PER_LITRE,
  PETROL_BIKE_LITRES_PER_100KM,
  SWAP_PRICE_CDF,
  SWAP_RANGE_KM,
} from './constants';

export interface SavingsResult {
  petrolPerDay: number;
  electricPerDay: number;
  savedPerDay: number;
  savedPerMonth: number;
  savedPerYear: number;
}

const WORKING_DAYS_PER_MONTH = 26;

export function computeSavings(
  kmPerDay: number,
  fuelPrice = FUEL_PRICE_CDF_PER_LITRE,
): SavingsResult {
  const km = Math.max(0, kmPerDay);
  const petrolPerDay = (km / 100) * PETROL_BIKE_LITRES_PER_100KM * fuelPrice;
  const electricPerDay = Math.ceil(km / SWAP_RANGE_KM) * SWAP_PRICE_CDF;
  const savedPerDay = Math.max(0, petrolPerDay - electricPerDay);

  return {
    petrolPerDay,
    electricPerDay,
    savedPerDay,
    savedPerMonth: savedPerDay * WORKING_DAYS_PER_MONTH,
    savedPerYear: savedPerDay * WORKING_DAYS_PER_MONTH * 12,
  };
}
