import { useId } from 'react';

/**
 * Pictogramme Spiro (repère + symbole marche/arrêt), redessiné en attendant le SVG officiel.
 * Charte : bleu sur fond clair ou jaune, jaune sur fond bleu. Ne pas inverser ni déformer.
 */
export function BrandIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  const maskId = useId();
  return (
    <svg className="brand-icon" width={size * 0.85} height={size} viewBox="0 0 100 118" aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect width="100" height="118" fill="#fff" />
          <circle cx="50" cy="52" r="23" fill="#000" />
          <rect x="37" y="0" width="26" height="36" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`} fill={color}>
        <circle cx="50" cy="52" r="40" />
        <path d="M28 82 L72 82 L50 116 Z" />
      </g>
      <rect x="44" y="4" width="12" height="48" rx="6" fill={color} />
    </svg>
  );
}

/** Signature de marque : « Energy on the » en Regular, « move » en Bold (charte p. 6). */
export function Tagline() {
  return (
    <span className="tagline">
      Energy on the <strong>move</strong>
    </span>
  );
}
