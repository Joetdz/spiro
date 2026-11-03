import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

// Police de marque Spiro (charte graphique, p. 15).
const sans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Spiro RDC – Motos électriques et échange de batteries à Kinshasa',
    template: '%s | Spiro RDC',
  },
  description:
    'Roulez électrique à Kinshasa : motos Spiro, échange de batterie en moins de 2 minutes, location-vente payable par Mobile Money.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={sans.variable}>
      <body>
        {/* À retirer une fois les données réelles intégrées */}
        <div className="demo-banner">Version de démonstration : prix, stations et contacts sont des exemples.</div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
