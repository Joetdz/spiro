import Image from 'next/image';

// Photo : motos Spiro à Kinshasa (inscription du socle de la statue effacée).
export const HERO_PHOTO = '/images/kinshasa-ekon.webp';

/** En-tête plein écran avec photo de fond et texte en surimpression. */
export function HeroPhoto({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <section className={`hero-photo${small ? ' hero-photo-sm' : ''}`}>
      <Image src={HERO_PHOTO} alt="Motos électriques Spiro garées dans le centre de Kinshasa" fill priority sizes="100vw" />
      <div className="container">{children}</div>
    </section>
  );
}

/** La même photo recadrée sur les motos, dans une carte. */
export function MotoPhotoCard() {
  return (
    <div className="photo-card">
      <Image src={HERO_PHOTO} alt="Deux motos Spiro, rouge et verte" fill sizes="(max-width: 900px) 160vw, 900px" />
    </div>
  );
}
