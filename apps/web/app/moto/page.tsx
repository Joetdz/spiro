import type { Metadata } from 'next';
import Link from 'next/link';
import { ApiUnavailable } from '@/components/ApiUnavailable';
import { ColorPicker } from '@/components/ColorPicker';
import { DriveModes } from '@/components/DriveModes';
import { HeroPhoto } from '@/components/HeroPhoto';
import { SavingsCalculator } from '@/components/SavingsCalculator';
import { getMotorcycle } from '@/lib/api';

export const metadata: Metadata = { title: 'La moto' };

const STRENGTHS = [
  { title: 'Robuste', text: 'Cadre renforcé et suspensions réglées pour les nids-de-poule et les routes en terre.' },
  { title: 'Économique', text: 'Un coût par jour bien plus bas qu’une moto essence, sans vidange ni réparation moteur.' },
  { title: 'Réactive', text: 'Le couple du moteur électrique est disponible tout de suite, même chargé.' },
];

const DESIGN = [
  { title: 'Éclairage LED', text: 'Phare et feux à LED pour mieux voir et être vu la nuit.' },
  { title: 'Position confortable', text: 'Une posture pensée pour de longues journées en selle.' },
  { title: 'Tableau de bord LED', text: 'Vitesse, batterie et mode de conduite lisibles d’un coup d’œil.' },
  { title: 'Rangement avec prise', text: 'Un coffre pour vos affaires et une prise pour recharger votre téléphone.' },
];

const APP = [
  { title: 'Localisation GPS', text: 'Retrouvez votre moto à tout moment et activez l’antivol.' },
  { title: 'État de la batterie', text: 'Consultez le niveau de charge et trouvez la station la plus proche.' },
  { title: 'Assistance', text: 'Signalez un problème et suivez votre demande jusqu’à sa résolution.' },
];

export default async function MotoPage() {
  const moto = await getMotorcycle();

  return (
    <>
      <HeroPhoto small>
        <span className="eyebrow">La moto</span>
        <h1>{moto?.name ?? 'Ekon 450 M1'}</h1>
        <p className="lead">{moto?.tagline}</p>
        <Link href="/essai" className="btn btn-primary">Réserver un essai</Link>
      </HeroPhoto>

      {!moto ? (
        <section className="section"><div className="container"><ApiUnavailable /></div></section>
      ) : (
        <>
          <section className="section">
            <div className="container">
              <div className="specs" style={{ marginTop: 0 }}>
                <div className="spec"><strong>{moto.rangeKm} km</strong><span>par batterie</span></div>
                <div className="spec"><strong>{moto.peakPowerKw} kW</strong><span>puissance de crête</span></div>
                <div className="spec"><strong>{moto.topSpeedKmh} km/h</strong><span>vitesse maximale</span></div>
                <div className="spec"><strong>{moto.payloadKg} kg</strong><span>charge utile</span></div>
              </div>
              <div className="grid-3">
                {STRENGTHS.map((s) => (
                  <div key={s.title} className="card"><h3>{s.title}</h3><p>{s.text}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container"><ColorPicker /></div>
          </section>

          <section className="section">
            <div className="container grid-2" style={{ alignItems: 'start' }}>
              <div>
                <span className="eyebrow">Modes de conduite</span>
                <h2>Trois modes, un seul bouton</h2>
                <p className="lead">Adaptez la moto à votre journée : autonomie, polyvalence ou puissance.</p>
                <ul className="check-list">
                  {moto.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <DriveModes />
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Design</span>
                <h2>Pratique au quotidien</h2>
              </div>
              <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'stretch' }}>
                {DESIGN.map((d) => (
                  <div key={d.title} className="card"><h3>{d.title}</h3><p>{d.text}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Application Spiro</span>
                <h2>Votre moto dans votre poche</h2>
              </div>
              <div className="grid-3">
                {APP.map((a) => (
                  <div key={a.title} className="card"><h3>{a.title}</h3><p>{a.text}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-alt">
            <div className="container grid-2">
              <div>
                <span className="eyebrow">Garantie et assurance</span>
                <h2>Roulez l’esprit tranquille</h2>
                <p className="lead">
                  Moteur, contrôleur, cadre et composants principaux sont garantis jusqu’à 2 ans ou 30 000 km, selon la pièce.
                  Une assurance peut être proposée avec la moto.
                </p>
              </div>
              <div className="card">
                <span className="big-number">2 ans</span>
                <p>ou 30 000 km de garantie sur les composants principaux.</p>
              </div>
            </div>
          </section>

          <section className="section section-dark">
            <div className="container">
              <div className="section-head">
                <span className="eyebrow">Économies</span>
                <h2>Combien allez-vous gagner en plus ?</h2>
              </div>
              <SavingsCalculator />
            </div>
          </section>
        </>
      )}
    </>
  );
}
