'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readJson, type AdminHorario } from '../shared';

export default function HorariosPage() {
  const [horarios, setHorarios] = useState<AdminHorario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchHorarios = async () => {
      try {
        const data = await readJson<{ horarios?: AdminHorario[] }>('/api/horarios');
        if (!cancelled) {
          setHorarios(data.horarios || []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchHorarios();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este horario?')) return;
    await fetch(`/api/horarios/${id}`, { method: 'DELETE' });
    setHorarios((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Gestión</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Horarios</h1>
        </div>
        <Link href="/admin/horarios/nuevo" className="admin-button-dark">
          + Nuevo horario
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : horarios.length === 0 ? (
        <div className="admin-card p-10 text-center text-gray-600">No hay horarios.</div>
      ) : (
        <div className="grid gap-5">
          {horarios.map((horario) => (
            <article key={horario.id} className="admin-card px-6 py-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Categoría</p>
                    <p className="mt-2 text-xl font-black text-gray-900">{horario.categoria?.nombre || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Día</p>
                    <p className="mt-2 text-lg font-black text-gray-900">{horario.dia}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Sede</p>
                    <p className="mt-2 text-base text-gray-700">{horario.sede || '-'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-yellow-400/22 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-700">
                    {horario.horaInicio} - {horario.horaFin}
                  </div>
                  <Link href={`/admin/horarios/editar/${horario.id}`} className="admin-button-light">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(horario.id)} className="admin-button-light text-red-600">
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
