'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readJson, type AdminGaleria } from '../shared';

function isLocalImage(src: string) {
  return src.startsWith('/');
}

export default function GaleriaPage() {
  const [galeria, setGaleria] = useState<AdminGaleria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchGaleria = async () => {
      try {
        const data = await readJson<{ galeria?: AdminGaleria[] }>('/api/galeria');
        if (!cancelled) {
          setGaleria(data.galeria || []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchGaleria();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta foto?')) return;
    await fetch(`/api/galeria/${id}`, { method: 'DELETE' });
    setGaleria((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Gestión</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Galería</h1>
        </div>
        <Link href="/admin/galeria/nuevo" className="admin-button-dark">
          + Nueva foto
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : galeria.length === 0 ? (
        <div className="admin-card p-10 text-center text-gray-600">No hay fotos.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {galeria.map((item) => (
            <article key={item.id} className="admin-card overflow-hidden">
              <div className="relative h-52 overflow-hidden bg-gray-200">
                {item.imagen ? (
                  isLocalImage(item.imagen) ? (
                    <Image
                      src={item.imagen}
                      alt={item.titulo}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imagen} alt={item.titulo} className="h-full w-full object-cover" loading="lazy" />
                  )
                ) : null}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-gray-900">{item.titulo}</h2>
                    {item.categoria ? (
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">{item.categoria}</p>
                    ) : null}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                    item.activo ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.activo ? 'Activa' : 'Oculta'}
                  </span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href={`/admin/galeria/editar/${item.id}`} className="admin-button-light">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="admin-button-light text-red-600">
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
