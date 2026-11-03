'use client';

import type { LeadInput, LeadKind } from '@spiro/shared';
import { CommuneSelect } from './CommuneSelect';
import { FormStatus } from './FormStatus';
import { PhoneField } from './PhoneField';
import { useSubmit } from './useSubmit';

export function LeadForm({ kind }: { kind: LeadKind }) {
  const { pending, result, onSubmit } = useSubmit('/leads', (data): LeadInput => ({
    kind,
    name: String(data.get('name') ?? ''),
    phone: String(data.get('phone') ?? ''),
    commune: String(data.get('commune') ?? '') || undefined,
    message: String(data.get('message') ?? '') || undefined,
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
      <CommuneSelect />
      {kind === 'contact' && (
        <div className="field">
          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" rows={4} maxLength={1000} required />
        </div>
      )}
      <FormStatus result={result} />
      <button className="btn btn-dark" type="submit" disabled={pending}>
        {pending ? 'Envoi…' : kind === 'contact' ? 'Envoyer le message' : 'Je suis intéressé(e)'}
      </button>
    </form>
  );
}
