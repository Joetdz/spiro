import type { Metadata } from 'next';
import { ApiUnavailable } from '@/components/ApiUnavailable';
import { NewsGrid } from '@/components/NewsGrid';
import { getNews } from '@/lib/api';

export const metadata: Metadata = { title: 'Actualités' };

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Actualités</span>
          <h1>Les nouvelles de Spiro</h1>
          <p className="lead">Lancements, partenariats et nouvelles stations, en RDC et dans le reste du groupe.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">{news ? <NewsGrid news={news} /> : <ApiUnavailable />}</div>
      </section>
    </>
  );
}
