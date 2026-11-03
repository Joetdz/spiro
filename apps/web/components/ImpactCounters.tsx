'use client';

import type { ImpactFigure, ImpactIcon } from '@spiro/shared';
import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1800;

function format(value: number, decimals: number) {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const ICON_PATHS: Record<ImpactIcon, React.ReactNode> = {
  distance: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4.5-5" />
      <path d="M7 17h.01M17 17h.01" />
    </>
  ),
  co2: (
    <>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
      <path d="M5 19l7-7" />
    </>
  ),
  energy: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
  swap: (
    <>
      <path d="M4 9h13l-3-3" />
      <path d="M20 15H7l3 3" />
    </>
  ),
};

function Icon({ name }: { name: ImpactIcon }) {
  return (
    <svg className="impact-icon" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

/** Compteurs qui s'animent quand ils deviennent visibles. */
export function ImpactCounters({ figures }: { figures: ImpactFigure[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="impact">
      {figures.map((f) => (
        <div key={f.label} className="impact-item">
          <Icon name={f.icon} />
          <strong>
            {format(f.value * progress, f.decimals)}
            {f.suffix}
          </strong>
          <span>{f.label}</span>
        </div>
      ))}
    </div>
  );
}
