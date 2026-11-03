'use client';

import { useState } from 'react';

const MODES = [
  { id: 'eco', name: 'Eco', title: 'Pour aller le plus loin', text: 'Accélération plus douce et consommation réduite : idéal pour les longues journées de courses entre les communes.' },
  { id: 'normal', name: 'Normal', title: 'Pour tous les jours', text: 'Le bon équilibre entre puissance et autonomie pour circuler en ville, avec ou sans passager.' },
  { id: 'sport', name: 'Sport', title: 'Pour la puissance', text: 'Toute la réponse du moteur électrique pour les montées, les dépassements et les charges lourdes.' },
];

export function DriveModes() {
  const [active, setActive] = useState(MODES[1]);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Modes de conduite">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === active.id}
            className={`tab${m.id === active.id ? ' active' : ''}`}
            onClick={() => setActive(m)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="card" role="tabpanel">
        <h3>{active.title}</h3>
        <p>{active.text}</p>
      </div>
    </div>
  );
}
