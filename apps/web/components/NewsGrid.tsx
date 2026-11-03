import type { NewsItem } from '@spiro/shared';

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <div className="grid-3">
      {news.map((item) => (
        <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="card news-card">
          <div className="news-meta">
            {dateFormat.format(new Date(item.date))} · {item.source}
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <span className="more">Lire la suite →</span>
        </a>
      ))}
    </div>
  );
}
