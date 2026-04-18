'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { AdminUser } from '@/lib/types';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/noticias', label: 'Noticias', icon: '📰' },
  { href: '/admin/categorias', label: 'Categorías', icon: '⚽' },
  { href: '/admin/horarios', label: 'Horarios', icon: '🕐' },
  { href: '/admin/galeria', label: 'Galería', icon: '📸' },
  { href: '/admin/configuracion', label: 'Configuración', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }

        const data = (await res.json()) as { user: AdminUser };
        if (!cancelled) {
          setUser(data.user);
        }
      } catch {
        router.push('/admin/login');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="admin-shell flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-white/8 bg-black text-white transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/8 px-6 py-7">
            <Link href="/admin/dashboard" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:rgba(196,23,48,0.35)] bg-[color:rgba(196,23,48,0.12)] text-[var(--red-600)]">
                ⚽
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:rgba(196,23,48,0.72)]">Panel</p>
                <p className="text-2xl font-black tracking-tight">
                  Admin <span className="text-[var(--red-600)]">Santa Bárbara</span>
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-5">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    active
                      ? 'bg-[var(--red-600)] text-white shadow-[0_14px_28px_rgba(196,23,48,0.24)]'
                      : 'text-white/65 hover:bg-white/6 hover:text-[var(--red-600)]'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/8 p-4">
            <Link
              href="/"
              className="mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-white/65 transition hover:bg-white/6 hover:text-[var(--red-600)]"
            >
              <span>🌐</span> Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-white/65 transition hover:bg-red-600 hover:text-white"
            >
              <span>🚪</span> Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 bg-black/55 md:hidden" onClick={() => setSidebarOpen(false)} />
      ) : null}

      <div className="flex-1 md:ml-72">
        <header className="sticky top-0 z-30 border-b border-black/6 bg-white/70 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/8 bg-white md:hidden"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="ml-auto flex items-center gap-4">
              {user ? (
                <div className="admin-card px-5 py-3 text-sm text-gray-600">
                  Administrando como <span className="font-black text-gray-900">{user.nombre || user.username}</span>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-28">
              <div className="admin-dark-card px-10 py-10 text-center">
                <div className="mb-4 text-4xl text-[var(--red-600)]">⚽</div>
                <p className="text-white/72">Cargando panel...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
