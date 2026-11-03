'use client';

import { useState } from 'react';
import { MotoIllustration } from './MotoIllustration';

const COLORS = [
  { name: 'Vert', hex: '#1f9d55' },
  { name: 'Noir', hex: '#1b1f24' },
  { name: 'Jaune', hex: '#f2b705' },
  { name: 'Rouge', hex: '#d33b2c' },
  { name: 'Bleu', hex: '#1d5fbf' },
];

export function ColorPicker() {
  const [selected, setSelected] = useState(COLORS[0]);

  return (
    <div className="grid-2">
      <MotoIllustration color={selected.hex} />
      <div>
        <span className="eyebrow">Couleurs</span>
        <h2>Choisissez votre style</h2>
        <p className="lead">Cinq coloris disponibles. Actuellement : {selected.name.toLowerCase()}.</p>
        <div className="swatches" role="radiogroup" aria-label="Couleur de la moto">
          {COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={c.name === selected.name}
              aria-label={c.name}
              title={c.name}
              className="swatch"
              style={{ background: c.hex }}
              onClick={() => setSelected(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
