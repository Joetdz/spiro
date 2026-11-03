'use client';

import type { TestRideInput } from '@spiro/shared';
import { CommuneSelect } from './CommuneSelect';
import { FormStatus } from './FormStatus';
import { PhoneField } from './PhoneField';
import { useSubmit } from './useSubmit';

const ACTIVITIES = [
  { value: 'taxi-moto', label: 'Taxi-moto (wewa)' },
  { value: 'livraison', label: 'Livraison' },
  { value: 'personnel', label: 'Usage personnel' },
  { value: 'flotte', label: 'Gestion de flotte' },
];

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function TestRideForm() {
  const { pending, result, onSubmit } = useSubmit('/test-rides', (data): TestRideInput => ({
    name: String(data.get('name') ?? ''),
    phone: String(data.get('phone') ?? ''),
    commune: String(data.get('commune') ?? ''),
    preferredDate: String(data.get('preferredDate') ?? ''),
    activity: String(data.get('activity') ?? ''),
  }));

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nom complet</label>
          <input id="name" name="name" autoComplete="name" required maxLength={80} />
        </div>
        <PhoneField />
      </div>
      <div className="form-row">
        <CommuneSelect required />
        <div className="field">
          <label htmlFor="activity">Votre activité</label>
          <select id="activity" name="activity" required defaultValue="">
            <option value="" disabled>
              Choisissez
            </option>
            {ACTIVITIES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="preferredDate">Date souhaitée</label>
        <input id="preferredDate" name="preferredDate" type="date" min={tomorrow()} required />
      </div>
      <FormStatus result={result} />
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? 'Envoi…' : 'Réserver mon essai gratuit'}
      </button>
    </form>
  );
}
