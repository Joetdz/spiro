import type { ImpactFigure, Motorcycle, NewsItem, Plan, Stat, Station } from '@spiro/shared';

// EXEMPLE : toutes les données ci-dessous sont fictives et doivent être
// remplacées par les informations réelles de Spiro RDC avant la mise en ligne.

export const STATIONS: Station[] = [
  { id: 'gombe-30-juin', name: 'Station Gombe – 30 Juin', commune: 'Gombe', address: 'Boulevard du 30 Juin', hours: '24h/24', open24h: true, batteriesAvailable: 42, lat: -4.3025, lng: 15.3091 },
  { id: 'limete-7e-rue', name: 'Station Limete 7e Rue', commune: 'Limete', address: '7e Rue, Limete industriel', hours: '24h/24', open24h: true, batteriesAvailable: 35, lat: -4.3462, lng: 15.3367 },
  { id: 'kintambo-magasin', name: 'Station Kintambo Magasin', commune: 'Kintambo', address: 'Rond-point Kintambo Magasin', hours: '05h30 – 23h00', open24h: false, batteriesAvailable: 28, lat: -4.3326, lng: 15.2783 },
  { id: 'kalamu-victoire', name: 'Station Victoire', commune: 'Kalamu', address: 'Place de la Victoire', hours: '24h/24', open24h: true, batteriesAvailable: 51, lat: -4.3388, lng: 15.3087 },
  { id: 'bandal-moulaert', name: 'Station Bandal Moulaert', commune: 'Bandalungwa', address: 'Avenue Kasa-Vubu, arrêt Moulaert', hours: '05h30 – 23h00', open24h: false, batteriesAvailable: 19, lat: -4.3431, lng: 15.2884 },
  { id: 'ngaliema-upn', name: 'Station UPN', commune: 'Ngaliema', address: 'Route de Matadi, rond-point UPN', hours: '24h/24', open24h: true, batteriesAvailable: 37, lat: -4.3901, lng: 15.2456 },
  { id: 'lemba-rond-point-ngaba', name: 'Station Rond-point Ngaba', commune: 'Lemba', address: 'Rond-point Ngaba', hours: '05h00 – 23h30', open24h: false, batteriesAvailable: 24, lat: -4.3878, lng: 15.3102 },
  { id: 'matete-marche', name: 'Station Marché Matete', commune: 'Matete', address: 'Avenue Mangembo, près du marché', hours: '05h30 – 22h30', open24h: false, batteriesAvailable: 16, lat: -4.3796, lng: 15.3454 },
  { id: 'masina-petro-congo', name: 'Station Petro-Congo', commune: 'Masina', address: 'Boulevard Lumumba, arrêt Petro-Congo', hours: '24h/24', open24h: true, batteriesAvailable: 46, lat: -4.3858, lng: 15.3925 },
  { id: 'ndjili-aeroport', name: 'Station Ndjili Aéroport', commune: 'Ndjili', address: 'Boulevard Lumumba, sortie aéroport', hours: '24h/24', open24h: true, batteriesAvailable: 30, lat: -4.3951, lng: 15.4317 },
];

export const MOTORCYCLE: Motorcycle = {
  id: 'ekon-450-m1',
  name: 'Ekon 450 M1',
  tagline: 'La moto électrique pensée pour les routes de Kinshasa.',
  rangeKm: 93,
  topSpeedKmh: 90,
  peakPowerKw: 12,
  payloadKg: 300,
  features: [
    'Échange de batterie en moins de 2 minutes',
    'Suivi GPS et antivol depuis l’application',
    'Châssis renforcé pour les routes non goudronnées',
    'Garde au sol adaptée à la saison des pluies',
    'Zéro bruit, zéro fumée, zéro vidange',
  ],
};

export const PLANS: Plan[] = [
  {
    id: 'location-vente',
    name: 'Location-vente',
    priceLabel: 'à partir de 7 000 FC / jour',
    description: 'Roulez dès aujourd’hui et devenez propriétaire de votre moto en payant chaque jour.',
    benefits: ['Petit acompte au départ', 'Paiement quotidien par Mobile Money', 'Entretien inclus pendant le contrat'],
    highlighted: true,
  },
  {
    id: 'comptant',
    name: 'Achat comptant',
    priceLabel: '1 950 $',
    description: 'Achetez votre moto en une fois et ne payez ensuite que vos échanges de batterie.',
    benefits: ['Propriétaire immédiatement', 'Garantie constructeur', 'Premier mois d’échanges offert'],
  },
  {
    id: 'flotte',
    name: 'Flotte entreprise',
    priceLabel: 'Sur devis',
    description: 'Pour les sociétés de livraison, de transport et les associations de taximen.',
    benefits: ['Tarifs dégressifs', 'Tableau de bord de suivi de flotte', 'Interlocuteur dédié'],
  },
];

// Réseau local à Kinshasa (EXEMPLE).
export const STATS: Stat[] = [
  { label: 'stations d’échange', value: String(STATIONS.length) },
  { label: 'points de vente', value: '3' },
  { label: 'centres de service', value: '4' },
  { label: 'minutes pour changer de batterie', value: '< 2' },
];

// Chiffres du groupe Spiro publiés sur spironet.com (novembre 2026) : à mettre à jour régulièrement.
export const IMPACT: ImpactFigure[] = [
  { icon: 'distance', value: 3_284_933_575, decimals: 0, suffix: '', label: 'kilomètres parcourus' },
  { icon: 'co2', value: 241.4, decimals: 1, suffix: ' k', label: 'tonnes de CO₂ évitées' },
  { icon: 'energy', value: 123.1, decimals: 1, suffix: ' GWh', label: 'd’énergie distribuée' },
  { icon: 'swap', value: 59_800_292, decimals: 0, suffix: '', label: 'échanges de batteries' },
];

const GROUP_NEWS_URL = 'https://www.spironet.com/news';

// Actualités du groupe, résumées en français. Ajoutez ici les actualités RDC.
export const NEWS: NewsItem[] = [
  {
    id: 'yadea-2026',
    date: '2026-09-15',
    source: 'Spiro',
    title: 'Partenariat industriel avec Yadea',
    summary: 'Spiro s’associe au constructeur Yadea pour accélérer la production de motos électriques.',
    url: GROUP_NEWS_URL,
  },
  {
    id: 'cfo-2026',
    date: '2026-09-01',
    source: 'Spiro',
    title: 'Un nouveau directeur financier pour le groupe',
    summary: 'Ram Ramanathan rejoint Spiro au poste de Group CFO.',
    url: GROUP_NEWS_URL,
  },
  {
    id: 'mega-station-2026',
    date: '2026-08-07',
    source: 'The Star',
    title: 'Une méga-station d’échange ouvre à Nairobi',
    summary: 'Une station de grande capacité pour servir plus de motards aux heures de pointe.',
    url: GROUP_NEWS_URL,
  },
  {
    id: 'cdo-2026',
    date: '2026-08-01',
    source: 'Spiro',
    title: 'Nomination d’un Chief Development Officer',
    summary: 'Huy Chieu est chargé du développement du groupe.',
    url: GROUP_NEWS_URL,
  },
  {
    id: 'levee-2026',
    date: '2026-06-01',
    source: 'Bloomberg',
    title: 'Levée de fonds de 215 millions de dollars',
    summary: 'Le groupe lève de nouveaux fonds pour étendre son réseau en Afrique.',
    url: GROUP_NEWS_URL,
  },
];
