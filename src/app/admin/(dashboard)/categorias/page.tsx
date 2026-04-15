'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readJson, type AdminCategoria } from '../shared';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<AdminCategoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchCategorias = async () => {
      try {
        const data = await readJson<{ categorias?: AdminCategoria[] }>('/api/categorias');
        if (!cancelled) {
          setCategorias(data.categorias || []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchCategorias();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
    setCategorias((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Gestión</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Categorías</h1>
        </div>
        <Link href="/admin/categorias/nuevo" className="admin-button-dark">
          + Nueva categoría
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : categorias.length === 0 ? (
        <div className="admin-card p-10 text-center text-gray-600">No hay categorías.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {categorias.map((categoria) => (
            <article key={categoria.id} className="admin-card px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900">{categoria.nombre}</h2>
                  {categoria.descripcion ? (
                    <p className="mt-3 text-base leading-7 text-gray-600">{categoria.descripcion}</p>
                  ) : null}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                  categoria.activo ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {categoria.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm uppercase tracking-[0.16em] text-gray-400">
                  {categoria.edadMinima ?? '-'} - {categoria.edadMaxima ?? '-'} años
                </div>
                <div className="flex gap-3">
                  <Link href={`/admin/categorias/editar/${categoria.id}`} className="admin-button-light">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(categoria.id)} className="admin-button-light text-red-600">
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
