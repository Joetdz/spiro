import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Durabilité' };

const PILLARS = [
  { title: 'Climat', text: 'Réduire les émissions du transport urbain en remplaçant les motos essence.' },
  { title: 'Produit', text: 'Des motos et des batteries sûres, durables et réparables.' },
  { title: 'Planète', text: 'Énergie solaire, recyclage et seconde vie des batteries.' },
  { title: 'Personnes', text: 'Sécurité des motards, emplois locaux et formation.' },
];

const LCA = [
  { value: '−72 %', label: 'd’impact sur le climat' },
  { value: '−80 %', label: 'd’effet sur la couche d’ozone' },
  { value: '−20 %', label: 'de particules fines' },
];

const COMMITMENTS = [
  { title: 'Énergie solaire', text: 'Des stations alimentées par le soleil, comme le hub solaire de Bukoto en Ouganda, qui sert environ 300 motards par jour.' },
  { title: 'Batteries circulaires', text: 'Les batteries usées sont réutilisées pour du stockage d’énergie, puis recyclées.' },
  { title: 'Sécurité des motards', text: 'Formations à la conduite et à l’entretien pour bien connaître sa moto.' },
  { title: 'Formation', text: 'Une académie pour former techniciens, agents de station et conseillers.' },
  { title: 'Sécurité au travail', text: 'Des règles strictes dans les stations, ateliers et entrepôts.' },
  { title: 'Gouvernance', text: 'Éthique, conformité, achats responsables et protection des données.' },
];

export default function SustainabilityPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Durabilité</span>
          <h1>Une mobilité plus propre pour Kinshasa</h1>
          <p className="lead">Notre démarche repose sur quatre piliers : le climat, le produit, la planète et les personnes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          {PILLARS.map((p) => (
            <div key={p.title} className="card"><h3>{p.title}</h3><p>{p.text}</p></div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Analyse du cycle de vie</span>
            <h2>Comparée à une moto essence</h2>
            <p className="lead">Résultats d’une analyse réalisée selon les normes ISO et revue par un organisme indépendant.</p>
          </div>
          <div className="grid-3">
            {LCA.map((l) => (
              <div key={l.label} className="award">
                <strong style={{ fontSize: '2.4rem' }}>{l.value}</strong>
                <div>{l.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nos engagements</span>
            <h2>Au-delà de la moto</h2>
          </div>
          <div className="grid-3">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="card"><h3>{c.title}</h3><p>{c.text}</p></div>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>
            <a className="btn btn-dark" href="https://www.spironet.com/esg" target="_blank" rel="noreferrer">
              Rapport de durabilité du groupe
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
