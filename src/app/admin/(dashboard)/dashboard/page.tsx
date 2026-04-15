'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readJson, type AdminCategoria, type AdminGaleria, type AdminHorario, type AdminNoticia } from '../shared';

interface Stats {
  noticias: number;
  categorias: number;
  horarios: number;
  galeria: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ noticias: 0, categorias: 0, horarios: 0, galeria: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const [noticias, categorias, horarios, galeria] = await Promise.all([
          readJson<{ noticias?: AdminNoticia[]; pagination?: { total?: number } }>('/api/noticias'),
          readJson<{ categorias?: AdminCategoria[] }>('/api/categorias'),
          readJson<{ horarios?: AdminHorario[] }>('/api/horarios'),
          readJson<{ galeria?: AdminGaleria[] }>('/api/galeria'),
        ]);

        if (!cancelled) {
          setStats({
            noticias: noticias.pagination?.total || noticias.noticias?.length || 0,
            categorias: categorias.categorias?.length || 0,
            horarios: horarios.horarios?.length || 0,
            galeria: galeria.galeria?.length || 0,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  const cards = [
    { title: 'Noticias', count: stats.noticias, icon: '📰', href: '/admin/noticias' },
    { title: 'Categorías', count: stats.categorias, icon: '⚽', href: '/admin/categorias' },
    { title: 'Horarios', count: stats.horarios, icon: '🕐', href: '/admin/horarios' },
    { title: 'Galería', count: stats.galeria, icon: '📸', href: '/admin/galeria' },
  ];

  return (
    <div className="space-y-8">
      <section className="admin-dark-card overflow-hidden px-8 py-10">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--red-600)]">Dashboard</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.04em]">Control total del proyecto</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
          Gestiona el contenido con una interfaz más cuidada, alineada al tono premium del sitio público.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="admin-card p-6 transition hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-[var(--red-600)]">
                {card.icon}
              </div>
              <span className="rounded-full border border-[color:rgba(196,23,48,0.24)] bg-[color:rgba(196,23,48,0.12)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--red-600)]">
                Activo
              </span>
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">{card.title}</p>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900">{card.count}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="admin-card p-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--red-600)]">Accesos rápidos</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/admin/noticias/nuevo" className="admin-dark-card px-5 py-5">
              <div className="text-2xl text-[var(--red-600)]">📝</div>
              <p className="mt-4 text-lg font-black">Nueva noticia</p>
              <p className="mt-2 text-sm leading-6 text-white/62">Publicar contenido editorial del sitio.</p>
            </Link>
            <Link href="/admin/galeria/nuevo" className="admin-card border border-[color:rgba(196,23,48,0.2)] px-5 py-5">
              <div className="text-2xl text-[var(--red-600)]">🖼️</div>
              <p className="mt-4 text-lg font-black text-gray-900">Agregar foto</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">Subir material visual y ordenar la galería.</p>
            </Link>
            <Link href="/admin/horarios/nuevo" className="admin-card px-5 py-5">
              <div className="text-2xl text-[var(--red-600)]">📅</div>
              <p className="mt-4 text-lg font-black text-gray-900">Nuevo horario</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">Crear sesiones por categoría y sede.</p>
            </Link>
          </div>
        </div>

        <div className="admin-card p-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--red-600)]">Estado del panel</p>
          <div className="mt-6 space-y-4">
            {[
              ['Sitio público', 'Identidad premium aplicada'],
              ['Contenido editorial', 'Listo para nuevas publicaciones'],
              ['Gestión visual', 'Carga remota y local soportada'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-black/6 bg-white px-5 py-5">
                <p className="text-base font-black text-gray-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
