'use client';

import { useState, type FormEvent } from 'react';
import { submitJson, type SubmitResult } from '@/lib/submit';

/** Gère l'envoi d'un formulaire : état de chargement, résultat et réinitialisation. */
export function useSubmit(path: string, toPayload: (data: FormData) => unknown) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setResult(null);
    const res = await submitJson(path, toPayload(new FormData(form)));
    setResult(res);
    setPending(false);
    if (res.ok) form.reset();
  }

  return { pending, result, onSubmit };
}
