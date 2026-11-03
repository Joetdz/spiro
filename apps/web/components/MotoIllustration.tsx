// Illustration provisoire en attendant les photos officielles de la moto.
export function MotoIllustration({ color = '#3137fd' }: { color?: string }) {
  return (
    <div className="moto-visual">
      <svg viewBox="0 0 400 260" role="img" aria-label="Illustration d'une moto électrique">
        <circle cx="95" cy="190" r="52" fill="#0b1b2e" />
        <circle cx="95" cy="190" r="26" fill="#cfd8e3" />
        <circle cx="310" cy="190" r="52" fill="#0b1b2e" />
        <circle cx="310" cy="190" r="26" fill="#cfd8e3" />
        <path d="M95 190 L170 120 L250 120 L310 190" stroke="#3d4b5c" strokeWidth="10" fill="none" strokeLinecap="round" />
        <rect x="160" y="128" width="96" height="52" rx="10" fill="#dfff00" />
        <text x="208" y="160" textAnchor="middle" fontSize="18" fontWeight="800" fill="#1d22c9">⚡ 93 km</text>
        <path d="M140 108 L230 104 L250 118 L150 124 Z" fill={color} style={{ transition: 'fill 0.3s' }} />
        <path d="M250 120 L282 70 L300 70" stroke="#0b1b2e" strokeWidth="9" fill="none" strokeLinecap="round" />
        <rect x="292" y="60" width="34" height="10" rx="5" fill="#0b1b2e" />
        <path d="M290 92 L320 98" stroke="#dfff00" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}
