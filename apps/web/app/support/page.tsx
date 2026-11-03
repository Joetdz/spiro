import type { Metadata } from 'next';
import { SWAP_PRICE_CDF, formatCdf } from '@spiro/shared';
import { LeadForm } from '@/components/LeadForm';

export const metadata: Metadata = { title: 'Support et FAQ' };

const FAQ = [
  {
    q: 'Combien coûte un échange de batterie ?',
    a: `Un échange coûte ${formatCdf(SWAP_PRICE_CDF)} et vous donne environ 93 km d’autonomie.`,
  },
  {
    q: 'Comment payer ?',
    a: 'Par Mobile Money (M-Pesa, Orange Money, Airtel Money) directement depuis l’application Spiro ou en station.',
  },
  {
    q: 'Que faire si ma moto tombe en panne ?',
    a: 'Signalez l’incident dans l’application ou appelez le service client. Un technicien vous oriente vers le centre de service le plus proche.',
  },
  {
    q: 'La moto supporte-t-elle la pluie et les routes en terre ?',
    a: 'Oui. Le moteur et la batterie sont étanches et le châssis est renforcé pour les routes non goudronnées.',
  },
  {
    q: 'Quels documents faut-il pour la location-vente ?',
    a: 'Une pièce d’identité (carte d’électeur ou passeport), un permis de conduire, un justificatif de domicile et un numéro Mobile Money actif.',
  },
  {
    q: 'Que se passe-t-il si je ne paie pas un jour ?',
    a: 'Contactez-nous avant l’échéance : nous trouvons ensemble une solution adaptée à votre situation.',
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Support</span>
          <h1>Comment pouvons-nous vous aider ?</h1>
          <p className="lead">Questions fréquentes, assistance et demande de devis pour les flottes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div className="faq">
            <h2>Questions fréquentes</h2>
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="form-card">
            <h2>Écrivez-nous</h2>
            <LeadForm kind="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
