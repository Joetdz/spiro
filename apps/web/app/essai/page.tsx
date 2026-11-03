import type { Metadata } from 'next';
import { TestRideForm } from '@/components/TestRideForm';

export const metadata: Metadata = { title: 'Réserver un essai' };

export default function TestRidePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Essai gratuit</span>
          <h1>Essayez la moto avant de vous décider</h1>
          <p className="lead">30 minutes au guidon, accompagné d’un conseiller Spiro, dans un centre près de chez vous.</p>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container grid-2">
          <div>
            <h2>Comment se passe l’essai ?</h2>
            <ul className="check-list">
              <li>Vous choisissez une date, nous vous appelons pour fixer l’heure.</li>
              <li>Venez avec votre carte d’électeur ou votre passeport et votre permis.</li>
              <li>Le conseiller vous montre l’échange de batterie en station.</li>
              <li>Vous repartez avec une simulation de financement personnalisée.</li>
            </ul>
          </div>
          <div className="form-card">
            <TestRideForm />
          </div>
        </div>
      </section>
    </>
  );
}
