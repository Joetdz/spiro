import type { SubmitResult } from '@/lib/submit';

export function FormStatus({ result }: { result: SubmitResult | null }) {
  if (!result) return null;
  return (
    <div className={`alert ${result.ok ? 'alert-success' : 'alert-error'}`} role="status">
      {result.ok ? result.message : result.error}
    </div>
  );
}
