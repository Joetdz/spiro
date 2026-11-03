'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const LINKS = [
  { href: '/moto', label: 'Ekon 450 M1' },
  { href: '/stations', label: 'Réseau d’échange' },
  { href: '/technologie', label: 'Technologie' },
  { href: '/offres', label: 'Offres' },
];

const ABOUT_LINKS = [
  { href: '/a-propos', label: 'Qui sommes-nous' },
  { href: '/durabilite', label: 'Durabilité' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/support', label: 'Support' },
];

// Pages qui commencent par une grande photo : l'en-tête est transparent par-dessus.
const OVERLAY_PAGES = ['/', '/moto'];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const overlay = OVERLAY_PAGES.includes(pathname);
  const transparent = overlay && !scrolled && !open;
  const aboutActive = ABOUT_LINKS.some((l) => l.href === pathname);

  return (
    <header className={`header${overlay ? ' header-overlay' : ''}${transparent ? ' is-transparent' : ''}`}>
      <div className="container header-inner">
        <Logo onDark={transparent} />
        <button
          className="menu-toggle"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Navigation principale">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
          <div className={`nav-group${aboutOpen ? ' open' : ''}`} onMouseLeave={() => setAboutOpen(false)}>
            <button
              type="button"
              className={`nav-group-toggle${aboutActive ? ' active' : ''}`}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              onClick={() => setAboutOpen((v) => !v)}
              onMouseEnter={() => setAboutOpen(true)}
            >
              À propos
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <div className="nav-menu">
              {ABOUT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/essai" className="btn btn-primary">
            Réserver un essai
          </Link>
        </nav>
      </div>
    </header>
  );
}
