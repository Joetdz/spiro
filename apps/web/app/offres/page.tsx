import type { Metadata } from 'next';
import Link from 'next/link';
import { SWAP_PRICE_CDF, formatCdf } from '@spiro/shared';
import { ApiUnavailable } from '@/components/ApiUnavailable';
import { SavingsCalculator } from '@/components/SavingsCalculator';
import { getPlans } from '@/lib/api';

export const metadata: Metadata = { title: 'Offres et financement' };

export default async function OffersPage() {
  const plans = await getPlans();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Offres</span>
          <h1>Devenez propriétaire de votre moto</h1>
          <p className="lead">
            Location-vente, achat comptant ou flotte : payez comme vous voulez, en francs congolais ou en dollars, par
            Mobile Money.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!plans ? (
            <ApiUnavailable />
          ) : (
            <div className="grid-3">
              {plans.map((plan) => (
                <div key={plan.id} className={`card plan${plan.highlighted ? ' featured' : ''}`}>
                  {plan.highlighted && <span className="plan-tag">Le plus choisi</span>}
                  <h3>{plan.name}</h3>
                  <div className="plan-price">{plan.priceLabel}</div>
                  <p>{plan.description}</p>
                  <ul className="check-list">
                    {plan.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Link href={plan.id === 'flotte' ? '/support' : '/essai'} className="btn btn-dark">
                    {plan.id === 'flotte' ? 'Demander un devis' : 'Commencer'}
                  </Link>
                </div>
              ))}
            </div>
          )}
          <p className="calc-note">
            Échange de batterie : {formatCdf(SWAP_PRICE_CDF)} par échange. Financement sous réserve d’acceptation du
            dossier.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Simulateur</span>
            <h2>Vos économies face à l’essence</h2>
          </div>
          <SavingsCalculator />
        </div>
      </section>
    </>
  );
}
