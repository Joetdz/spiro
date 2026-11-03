'use client';

import { useState } from 'react';

const DEPENDENCIES = [
  { id: 'power', name: 'Réseau électrique', fallback: 'Les batteries déjà chargées en stock assurent les échanges.' },
  { id: 'internet', name: 'Internet', fallback: 'La station enregistre les échanges hors ligne et les synchronise au retour du réseau.' },
  { id: 'payment', name: 'Mobile Money', fallback: 'Les paiements sont mis en attente et réglés dès que l’opérateur répond.' },
  { id: 'cloud', name: 'Serveurs', fallback: 'Chaque station fonctionne de manière autonome.' },
];

/** Démonstration : couper un service ne bloque pas l'échange de batterie. */
export function ResilienceDemo() {
  const [off, setOff] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOff((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="calculator">
      <div>
        <p style={{ fontWeight: 700 }}>Coupez un service pour voir ce qui se passe :</p>
        <div className="toggles">
          {DEPENDENCIES.map((d) => (
            <label key={d.id} className="toggle">
              <input type="checkbox" checked={!off.has(d.id)} onChange={() => toggle(d.id)} />
              <span>{d.name}</span>
              <em>{off.has(d.id) ? 'coupé' : 'actif'}</em>
            </label>
          ))}
        </div>
      </div>
      <div className="calc-result">
        <span>État de l’échange de batterie</span>
        <strong>Disponible</strong>
        {off.size === 0 ? (
          <p style={{ margin: '16px 0 0', fontWeight: 600 }}>Tous les services fonctionnent normalement.</p>
        ) : (
          <ul style={{ margin: '16px 0 0', paddingLeft: 18, fontWeight: 600 }}>
            {DEPENDENCIES.filter((d) => off.has(d.id)).map((d) => (
              <li key={d.id}>{d.fallback}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
