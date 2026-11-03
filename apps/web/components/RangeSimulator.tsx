'use client';

import { useState } from 'react';

// Valeurs illustratives : autonomie selon le mode et trajet type dans Kinshasa.
const MODES = [
  { id: 'eco', name: 'Eco', rangeKm: 102 },
  { id: 'normal', name: 'Normal', rangeKm: 93 },
  { id: 'sport', name: 'Sport', rangeKm: 75 },
];

const ROUTE = [
  { from: 'Gombe', to: 'Kintambo', km: 6 },
  { from: 'Kintambo', to: 'Ngaliema', km: 8 },
  { from: 'Ngaliema', to: 'Lemba', km: 12 },
  { from: 'Lemba', to: 'Limete', km: 7 },
  { from: 'Limete', to: 'Gombe', km: 8 },
];

const ROUTE_KM = ROUTE.reduce((sum, leg) => sum + leg.km, 0);

export function RangeSimulator() {
  const [mode, setMode] = useState(MODES[1]);
  const usedPct = Math.min(100, Math.round((ROUTE_KM / mode.rangeKm) * 100));
  const left = Math.max(0, mode.rangeKm - ROUTE_KM);

  return (
    <div className="calculator">
      <div>
        <label>Mode de conduite</label>
        <div className="tabs" role="radiogroup" aria-label="Mode de conduite">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={m.id === mode.id}
              className={`tab${m.id === mode.id ? ' active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <p style={{ fontWeight: 700, marginTop: 20 }}>Trajet type : une boucle dans Kinshasa</p>
        <ol className="route">
          {ROUTE.map((leg) => (
            <li key={leg.from}>
              {leg.from} → {leg.to} <span>{leg.km} km</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="calc-result">
        <span>Batterie utilisée</span>
        <strong>{usedPct} %</strong>
        <div className="battery" aria-hidden="true">
          <div style={{ width: `${100 - usedPct}%` }} />
        </div>
        <p style={{ margin: '16px 0 0', fontWeight: 600 }}>
          {ROUTE_KM} km parcourus, il vous reste encore environ {left} km avant votre prochain échange.
        </p>
        <p className="calc-note" style={{ color: 'inherit', opacity: 0.75 }}>
          Chiffres illustratifs : l’autonomie réelle dépend de la charge, du relief et du style de conduite.
        </p>
      </div>
    </div>
  );
}
