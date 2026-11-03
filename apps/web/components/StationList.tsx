'use client';

import type { Station } from '@spiro/shared';
import { useMemo, useState } from 'react';

export function StationList({ stations }: { stations: Station[] }) {
  const [query, setQuery] = useState('');
  const [commune, setCommune] = useState('');

  const communes = useMemo(() => [...new Set(stations.map((s) => s.commune))].sort(), [stations]);
  const visible = stations.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || `${s.name} ${s.address} ${s.commune}`.toLowerCase().includes(q);
    return matchesQuery && (!commune || s.commune === commune);
  });

  return (
    <>
      <div className="filters">
        <input
          type="search"
          placeholder="Rechercher une station, une avenue…"
          aria-label="Rechercher une station"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select aria-label="Filtrer par commune" value={commune} onChange={(e) => setCommune(e.target.value)}>
          <option value="">Toutes les communes</option>
          {communes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="notice">Aucune station ne correspond à votre recherche.</p>
      ) : (
        <div className="station-grid">
          {visible.map((s) => (
            <article key={s.id} className="card station">
              <h3>{s.name}</h3>
              <div>{s.address}</div>
              <div className="station-meta">
                <span className="pill">{s.commune}</span>
                <span className={`pill${s.open24h ? ' pill-green' : ''}`}>{s.hours}</span>
                <span className="pill">{s.batteriesAvailable} batteries</span>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`} target="_blank" rel="noreferrer">
                Itinéraire →
              </a>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
