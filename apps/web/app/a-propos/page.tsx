import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'À propos' };

const VALUES = [
  {
    title: 'Plus de revenus pour les motards',
    text: 'Moins de dépenses en carburant et en entretien : plus d’argent qui reste dans la poche des taximen et livreurs.',
  },
  {
    title: 'Un air plus propre à Kinshasa',
    text: 'Zéro fumée à l’échappement, moins de bruit dans les quartiers et moins de dépendance aux importations de carburant.',
  },
  {
    title: 'Des emplois locaux',
    text: 'Agents de station, techniciens, conseillers : le réseau Spiro se construit avec des équipes congolaises.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">À propos</span>
          <h1>L’énergie en mouvement, maintenant en RDC</h1>
          <p className="lead">
            Spiro conçoit des motos électriques et exploite un réseau d’échange de batteries présent dans plusieurs pays
            d’Afrique. Notre mission à Kinshasa : rendre la mobilité électrique accessible à chaque motard.
          </p>
        </div>
      </section>

      {/* Mission, vision et valeurs : traduites de la charte de marque Spiro (V2, juillet 2023) */}
      <section className="section section-alt">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Notre mission</span>
            <p className="lead">
              Accélérer l’accès à des technologies d’énergie propre et abordables dans la mobilité, grâce à un service
              client excellent et une agilité constante.
            </p>
            <span className="eyebrow">Notre vision</span>
            <p className="lead">
              Permettre à tous d’accéder à une énergie propre en révolutionnant la mobilité, au bénéfice des personnes et
              de l’environnement.
            </p>
          </div>
          <div className="card">
            <h3>Nos valeurs</h3>
            <ul className="check-list">
              <li>Viser l’excellence dans le <strong>service client</strong> et pour l’<strong>environnement</strong>.</li>
              <li>Miser sur la <strong>diversité et l’intégrité</strong> au service de l’environnement et de nos communautés.</li>
              <li>Nous améliorer sans cesse pour <strong>innover</strong>, avec la science et les faits comme repères.</li>
              <li>Être <strong>agiles</strong> pour créer des opportunités pour nos équipes et nos communautés.</li>
            </ul>
            <p className="calc-note" style={{ margin: 0 }}>
              « Spiro » évoque en grec ancien un panier qui transporte les graines de la vie et de l’énergie.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {VALUES.map((v) => (
              <div key={v.title} className="card">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container grid-2">
          <div>
            <h2>Rejoignez le mouvement</h2>
            <p className="lead">
              Motards, entreprises de livraison, investisseurs ou partenaires : parlons de la mobilité électrique à
              Kinshasa.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/essai" className="btn btn-primary">
              Réserver un essai
            </Link>
            <Link href="/support" className="btn btn-dark">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
