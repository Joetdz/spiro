import type { Metadata } from 'next';
import { ApiUnavailable } from '@/components/ApiUnavailable';
import { RangeSimulator } from '@/components/RangeSimulator';
import { StationList } from '@/components/StationList';
import { getStations } from '@/lib/api';

export const metadata: Metadata = { title: 'Réseau d’échange' };

const ADVANTAGES = [
  { title: 'Connecté', text: 'Chaque station est reliée au réseau : disponibilité des batteries visible dans l’application.' },
  { title: 'Plus de route', text: '93 km par batterie, et une station jamais loin pour repartir.' },
  { title: 'Rapide', text: 'Moins de 2 minutes pour échanger, contre des heures pour recharger.' },
];

const BATTERY = [
  { title: 'Résistante', text: 'Protégée contre la chaleur, la poussière et les chocs.' },
  { title: 'Durable', text: 'Testée sur des milliers de cycles de charge avant d’être mise en service.' },
  { title: 'Contrôlée', text: 'Chaque batterie est vérifiée avant de retourner en station.' },
  { title: 'Intelligente', text: 'Des capteurs connectés surveillent son état en permanence.' },
];

export default async function StationsPage() {
  const stations = await getStations();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Réseau d’échange</span>
          <h1>L’énergie, sans attendre</h1>
          <p className="lead">Batterie vide ? Échangez-la contre une batterie pleine en moins de 2 minutes et reprenez la route.</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {ADVANTAGES.map((a) => (
            <div key={a.title} className="card"><h3>{a.title}</h3><p>{a.text}</p></div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nos batteries</span>
            <h2>Pensées pour le climat congolais</h2>
          </div>
          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, alignItems: 'stretch' }}>
            {BATTERY.map((b) => (
              <div key={b.title} className="card"><h3>{b.title}</h3><p>{b.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Simulateur</span>
            <h2>Jusqu’où pouvez-vous aller ?</h2>
          </div>
          <RangeSimulator />
        </div>
      </section>

      <section className="section" id="stations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nous trouver</span>
            <h2>Les stations à Kinshasa</h2>
          </div>
          {stations ? <StationList stations={stations} /> : <ApiUnavailable />}
        </div>
      </section>
    </>
  );
}
