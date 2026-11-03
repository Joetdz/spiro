import type { Metadata } from 'next';
import { ResilienceDemo } from '@/components/ResilienceDemo';

export const metadata: Metadata = { title: 'Technologie' };

const MODULES = [
  {
    name: 'Application Spiro',
    audience: 'Pour les motards',
    items: ['Trouver une station et voir les batteries disponibles', 'Payer ses échanges par Mobile Money', 'Suivre sa moto et demander de l’aide'],
  },
  {
    name: 'Spiro IoT',
    audience: 'Motos et batteries connectées',
    items: ['Suivi en direct de chaque moto', 'Diagnostic à distance', 'Pilotage du réseau à partir des données'],
  },
  {
    name: 'CredTrack',
    audience: 'Pour les partenaires financiers',
    items: ['Localisation en temps réel', 'Utilisation de la moto', 'Suivi des remboursements', 'Alertes et actions à distance'],
  },
  {
    name: 'Spiro Maps',
    audience: 'Cartographie',
    items: ['Recherche de stations', 'Navigation jusqu’à la station', 'Choix des futurs emplacements'],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <section className="page-hero page-hero-savanna">
        <div className="container">
          <span className="eyebrow">Technologie</span>
          <h1>Une plateforme qui ne s’arrête jamais</h1>
          <p className="lead">Logiciels, objets connectés et cartographie : tout ce qui fait tourner le réseau Spiro.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'stretch' }}>
          {MODULES.map((m) => (
            <div key={m.name} className="card">
              <span className="eyebrow">{m.audience}</span>
              <h3>{m.name}</h3>
              <ul className="check-list">
                {m.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Résilience</span>
            <h2>Coupure de courant ou de réseau ? On échange quand même.</h2>
            <p className="lead">
              Les stations continuent de fonctionner quand l’électricité, Internet ou le paiement mobile tombent en panne.
              Lors d’une longue coupure télécom en 2026, plus de 75 000 échanges ont été réalisés hors ligne, puis tous
              réglés au retour de la connexion.
            </p>
          </div>
          <ResilienceDemo />
        </div>
      </section>
    </>
  );
}
