'use client';

import { FUEL_PRICE_CDF_PER_LITRE, computeSavings, cdfToUsd, formatCdf, formatUsd } from '@spiro/shared';
import { useState } from 'react';

export function SavingsCalculator() {
  const [km, setKm] = useState(120);
  const [fuelPrice, setFuelPrice] = useState(FUEL_PRICE_CDF_PER_LITRE);
  const result = computeSavings(km, fuelPrice);

  return (
    <div className="calculator">
      <div>
        <label htmlFor="km">Combien de km roulez-vous par jour ?</label>
        <div className="calc-value">{km} km</div>
        <input id="km" type="range" min={20} max={250} step={10} value={km} onChange={(e) => setKm(Number(e.target.value))} />

        <div className="field" style={{ marginTop: 20 }}>
          <label htmlFor="fuel">Prix du litre d’essence (FC)</label>
          <input
            id="fuel"
            type="number"
            min={500}
            step={50}
            value={fuelPrice}
            onChange={(e) => setFuelPrice(Number(e.target.value) || 0)}
          />
        </div>

        <div className="calc-rows">
          <div className="calc-row">
            <span>Moto essence / jour</span>
            <strong>{formatCdf(result.petrolPerDay)}</strong>
          </div>
          <div className="calc-row">
            <span>Spiro électrique / jour</span>
            <strong>{formatCdf(result.electricPerDay)}</strong>
          </div>
        </div>
      </div>

      <div className="calc-result">
        <span>Vous économisez environ</span>
        <strong>{formatCdf(result.savedPerMonth)}</strong>
        <span>par mois (≈ {formatUsd(cdfToUsd(result.savedPerMonth))})</span>
        <p style={{ margin: '16px 0 0', fontWeight: 600 }}>
          Soit {formatCdf(result.savedPerYear)} par an, sans vidange ni réparation de moteur.
        </p>
        <p className="calc-note" style={{ color: 'inherit', opacity: 0.75 }}>
          Estimation sur 26 jours de travail par mois. Tarifs indicatifs.
        </p>
      </div>
    </div>
  );
}
