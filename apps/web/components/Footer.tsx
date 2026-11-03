import Link from 'next/link';
import { Tagline } from './Brand';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo onDark />
            <p className="tagline-row"><Tagline /></p>
            <p>Motos électriques et réseau d’échange de batteries pour les motards de Kinshasa.</p>
          </div>
          <div>
            <h4>Produits</h4>
            <ul>
              <li><Link href="/moto">Ekon 450 M1</Link></li>
              <li><Link href="/stations">Stations d’échange</Link></li>
              <li><Link href="/offres">Offres et financement</Link></li>
            </ul>
          </div>
          <div>
            <h4>Spiro</h4>
            <ul>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/technologie">Technologie</Link></li>
              <li><Link href="/durabilite">Durabilité</Link></li>
              <li><Link href="/actualites">Actualités</Link></li>
              <li><Link href="/support">Support et FAQ</Link></li>
              <li><Link href="/essai">Réserver un essai</Link></li>
            </ul>
          </div>
          <div>
            {/* EXEMPLE : coordonnées fictives à remplacer */}
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+243800000000">+243 800 000 000</a></li>
              <li><a href="mailto:contact@spiro-rdc.example">contact@spiro-rdc.example</a></li>
              <li>Boulevard du 30 Juin, Gombe, Kinshasa</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Spiro RDC. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
