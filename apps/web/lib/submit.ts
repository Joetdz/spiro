import type { CreatedResponse } from '@spiro/shared';

export type SubmitResult = { ok: true; message: string } | { ok: false; error: string };

/** Envoi d'un formulaire depuis le navigateur vers l'API (via le relais /api de Next). */
export async function submitJson(path: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    if (res.ok) return { ok: true, message: (data as CreatedResponse).message };

    const detail = Array.isArray(data?.message) ? data.message[0] : data?.message;
    return { ok: false, error: detail ?? 'Une erreur est survenue. Réessayez.' };
  } catch {
    return { ok: false, error: 'Connexion impossible. Vérifiez votre réseau et réessayez.' };
  }
}
