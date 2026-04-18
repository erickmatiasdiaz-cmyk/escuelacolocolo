'use client';

import BrandLogo from '@/components/public/BrandLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/categorias', label: 'Categorías' },
  { href: '/horarios', label: 'Horarios' },
  { href: '/galeria', label: 'Galería' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[linear-gradient(90deg,rgba(8,12,24,0.96),rgba(16,42,103,0.92))] text-white backdrop-blur-xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-4">
            <BrandLogo size={46} />
            <div className="leading-none">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-white/62">
                Escuela de fútbol
              </p>
              <p className="mt-1 text-[1.65rem] font-black tracking-[-0.04em] text-white transition group-hover:text-white/88">
                Colo Colo<span className="text-[#d11d38]"> Santa Bárbara</span>
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link rounded-full px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition duration-200 hover:-translate-y-0.5 ${
                    active ? 'nav-link-active text-white' : 'text-white/76 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="admin-nav-link ml-4 inline-flex min-h-0 items-center rounded-full border border-white/14 bg-[#c41730] px-5 py-3 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(196,23,48,0.28)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <span className="relative z-10">Admin</span>
            </Link>
          </nav>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Abrir menú"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {mobileOpen ? (
          <nav className="glass-panel mb-4 rounded-[1.75rem] p-3 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] ${
                      active ? 'bg-white/10 text-white' : 'text-white/82'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/admin" className="btn-primary mt-2" onClick={() => setMobileOpen(false)}>
                Admin
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
