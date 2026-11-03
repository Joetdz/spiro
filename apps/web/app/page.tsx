import Image from 'next/image';
import Link from 'next/link';
import { SWAP_PRICE_CDF, formatCdf } from '@spiro/shared';
import { BrandIcon, Tagline } from '@/components/Brand';
import { ImpactCounters } from '@/components/ImpactCounters';
import { LeadForm } from '@/components/LeadForm';
import { HeroPhoto, MotoPhotoCard } from '@/components/HeroPhoto';
import { NewsGrid } from '@/components/NewsGrid';
import { SavingsCalculator } from '@/components/SavingsCalculator';
import { getImpact, getMotorcycle, getNews, getPlans, getStats } from '@/lib/api';

const FEATURES = [
  { title: 'Batterie pleine en 2 minutes', text: `Échangez, payez ${formatCdf(SWAP_PRICE_CDF)} par Mobile Money et repartez. Pas d’attente à la prise.` },
  { title: 'Faite pour toutes les routes', text: 'Goudron, latérite ou chaussée inondée : châssis renforcé et bonne garde au sol.' },
  { title: 'Suivie en temps réel', text: 'Localisez votre moto, consultez votre batterie et signalez un souci depuis l’application.' },
  { title: 'Passagers et marchandises', text: 'Jusqu’à 300 kg de charge utile pour un client, des colis ou des sacs du marché.' },
  { title: 'Moins de frais d’entretien', text: 'Pas de vidange, pas d’embrayage, pas de bougie : moins de pièces qui s’usent.' },
  { title: 'Financement adapté', text: 'Payez par jour en location-vente et devenez propriétaire sans gros apport.' },
];

const SUPPORT = [
  { title: 'Centres de service', text: 'Des techniciens formés dans plusieurs communes de Kinshasa.' },
  { title: 'Suivi des demandes', text: 'Ouvrez une demande dans l’application et suivez-la jusqu’à sa résolution.' },
  { title: 'Pièces d’origine', text: 'Des pièces détachées authentiques, disponibles rapidement.' },
];

// EXEMPLES : à remplacer par de vrais témoignages de motards (avec leur accord).
const TESTIMONIALS = [
  { name: 'Patrick M.', role: 'Taxi-moto, Limete', text: 'Avant, une grosse partie de ma recette partait dans l’essence. Maintenant je garde plus pour ma famille.' },
  { name: 'Grâce K.', role: 'Livreuse, Gombe', text: 'Je change la batterie entre deux livraisons, ça prend moins de temps que de faire la queue à la pompe.' },
  { name: 'Didier N.', role: 'Taxi-moto, Masina', text: 'La moto est silencieuse et elle monte bien, même avec un client et ses bagages.' },
];

const ENGINEERING = [
  { title: 'Batteries tropicalisées', text: 'Conçues pour la chaleur, la poussière et l’humidité, et testées sur des milliers de cycles.' },
  { title: 'Réseau dense', text: 'Des stations placées sur les grands axes et aux carrefours où travaillent les motards.' },
  { title: 'Testée sur le terrain', text: 'Chaque modèle est éprouvé sur les routes africaines avant sa mise en vente.' },
  { title: 'Améliorée par les données', text: 'Les données des motos et des stations servent à améliorer le service en continu.' },
];

const AWARDS = [
  { year: '2025', title: 'Entreprise e-mobilité de l’année', by: 'Kenya' },
  { year: '2024', title: 'TIME100', by: 'Entreprises les plus influentes' },
  { year: '2024', title: 'Meilleure moto électrique', by: 'East Africa Biker Awards' },
  { year: '2024', title: 'Resilient Infrastructure Award', by: 'Infrastructure résiliente' },
];

export default async function HomePage() {
  const [impact, moto, stats, plans, news] = await Promise.all([
    getImpact(),
    getMotorcycle(),
    getStats(),
    getPlans(),
    getNews(),
  ]);

  return (
    <>
      <HeroPhoto>
          <div>
            <div className="hero-badge">
              <BrandIcon size={18} color="var(--accent)" /> <Tagline />
            </div>
            <h1>
              Votre moto travaille, <span>votre argent reste.</span>
            </h1>
            <p className="lead">
              La moto électrique Spiro, pensée pour les taxis-motos et les livreurs : plus d’essence à acheter, une batterie
              pleine en 2 minutes et plus d’argent en fin de journée.
            </p>
            <div className="btn-row">
              <Link href="/essai" className="btn btn-primary">
                Réserver un essai
              </Link>
              <a href="#moto" className="btn btn-ghost">
                En savoir plus
              </a>
            </div>
          </div>
      </HeroPhoto>

      {impact && (
        <section className="impact-band" id="impact">
          <div className="container">
            <p className="impact-title">Spiro accélère la mobilité électrique en Afrique</p>
            <ImpactCounters figures={impact} />
          </div>
        </section>
      )}

      {moto && (
        <section className="section product-section" id="moto">
          <div className="container">
            <h2 className="section-title">Une moto qui fait grandir vos revenus</h2>
            <article className="product-card">
              <div className="product-info">
                <h3 className="product-name">{moto.name}</h3>
                <p>Moins de dépenses à chaque kilomètre, plus de gains à chaque journée.</p>
                <dl className="product-specs">
                  <div><dt>{moto.rangeKm} km</dt><dd>d’autonomie par échange</dd></div>
                  <div><dt>{moto.peakPowerKw} kW</dt><dd>de puissance de crête</dd></div>
                  <div><dt>{moto.topSpeedKmh} km/h</dt><dd>de vitesse maximale</dd></div>
                  <div><dt>{moto.payloadKg} kg</dt><dd>de charge utile</dd></div>
                </dl>
                <Link href="/moto" className="btn btn-ink">Découvrir l’Ekon →</Link>
              </div>
              <MotoPhotoCard />
            </article>
            <p className="product-note">Caractéristiques indicatives, mesurées en conditions de test standard.</p>
          </div>
        </section>
      )}

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Calculateur d’économies</span>
            <h2>Roulez plus, dépensez moins</h2>
            <p className="lead">Comparez avec votre moto essence actuelle.</p>
          </div>
          <SavingsCalculator />
        </div>
      </section>

      {stats && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Le réseau à Kinshasa</span>
              <h2>Toujours une station sur votre route</h2>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Pourquoi Spiro</span>
            <h2>Conçue pour gagner sa vie chaque jour</h2>
          </div>
          <div className="grid-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {plans && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Financement</span>
              <h2>Une formule pour chaque motard</h2>
            </div>
            <div className="grid-3">
              {plans.map((plan) => (
                <div key={plan.id} className={`card plan${plan.highlighted ? ' featured' : ''}`}>
                  {plan.highlighted && <span className="plan-tag">Le plus choisi</span>}
                  <h3>{plan.name}</h3>
                  <div className="plan-price">{plan.priceLabel}</div>
                  <p>{plan.description}</p>
                </div>
              ))}
            </div>
            <p className="calc-note">Financement sous réserve d’acceptation du dossier.</p>
            <Link href="/offres" className="btn btn-dark">Voir le détail des offres</Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Support</span>
            <h2>On ne vous laisse pas seul sur la route</h2>
          </div>
          <div className="grid-3">
            {SUPPORT.map((s) => (
              <div key={s.title} className="card">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ils roulent Spiro</span>
            <h2>La parole aux motards</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card quote">
                <blockquote>« {t.text} »</blockquote>
                <figcaption>
                  {t.name}
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Reconnaissance</span>
            <h2>Un groupe distingué à travers l’Afrique</h2>
          </div>
          <div className="awards">
            {AWARDS.map((a) => (
              <div key={a.title} className="award">
                <strong>{a.year}</strong>
                <div style={{ fontWeight: 700, color: '#fff' }}>{a.title}</div>
                <div>{a.by}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Technologie</span>
            <h2>Construite pour les routes africaines</h2>
          </div>
          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'stretch' }}>
            {ENGINEERING.map((e) => (
              <div key={e.title} className="card">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {news && news.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Actualités</span>
              <h2>Les dernières nouvelles</h2>
            </div>
            <NewsGrid news={news.slice(0, 3)} />
            <p style={{ marginTop: 24 }}>
              <Link href="/actualites" className="btn btn-dark">Toutes les actualités</Link>
            </p>
          </div>
        </section>
      )}

      <section className="section" id="interet">
        <div className="container grid-2">
          <div>
            <span className="eyebrow">Prêt à passer à l’électrique ?</span>
            <h2>Un conseiller vous rappelle</h2>
            <p className="lead">
              Laissez votre numéro : nous vous expliquons les offres, le financement et les stations près de chez vous.
            </p>
            <div className="house-crop" aria-hidden="true">
              <Image src="/images/maison.webp" alt="" width={2732} height={2556} sizes="(max-width: 900px) 100vw, 1050px" />
            </div>
          </div>
          <div className="form-card">
            <LeadForm kind="interet" />
          </div>
        </div>
      </section>
    </>
  );
}
