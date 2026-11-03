import type { ImpactFigure, Motorcycle, NewsItem, Plan, Stat, Station } from '@spiro/shared';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

/** Lecture côté serveur ; renvoie null si l'API est indisponible. */
async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const getStations = () => get<Station[]>('/stations');
export const getMotorcycle = () => get<Motorcycle>('/motorcycle');
export const getPlans = () => get<Plan[]>('/plans');
export const getStats = () => get<Stat[]>('/stats');
export const getImpact = () => get<ImpactFigure[]>('/impact');
export const getNews = () => get<NewsItem[]>('/news');
