import Link from 'next/link';
import { BrandIcon } from './Brand';

// La charte interdit de recomposer le logotype « spiro » avec une police :
// en attendant le fichier officiel (public/brand/spiro-logo.svg), on affiche le pictogramme seul.
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Spiro RDC – accueil">
      <BrandIcon size={36} color={onDark ? 'var(--accent)' : 'var(--brand)'} />
      <small>RDC</small>
    </Link>
  );
}
