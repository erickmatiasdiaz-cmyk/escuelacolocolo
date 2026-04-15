'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readJson, type AdminNoticia } from '../shared';

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<AdminNoticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchNoticias = async () => {
      try {
        const data = await readJson<{ noticias?: AdminNoticia[] }>('/api/noticias?limit=100');
        if (!cancelled) {
          setNoticias(data.noticias || []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchNoticias();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return;
    await fetch(`/api/noticias/${id}`, { method: 'DELETE' });
    setNoticias((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Gestión</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Noticias</h1>
        </div>
        <Link href="/admin/noticias/nuevo" className="admin-button-dark">
          + Nueva noticia
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : noticias.length === 0 ? (
        <div className="admin-card p-10 text-center text-gray-600">No hay noticias.</div>
      ) : (
        <div className="grid gap-5">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="admin-card flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black tracking-tight text-gray-900">{noticia.titulo}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                    noticia.publicado ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {noticia.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-gray-400">
                  {new Date(noticia.fechaPubli || noticia.createdAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/admin/noticias/editar/${noticia.id}`} className="admin-button-light">
                  Editar
                </Link>
                <button onClick={() => handleDelete(noticia.id)} className="admin-button-light text-red-600">
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
