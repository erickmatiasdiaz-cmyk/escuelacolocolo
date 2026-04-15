'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { readJson, type AdminCategoria } from '../../shared';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function NuevoHorarioPage() {
  const [categoriaId, setCategoriaId] = useState('');
  const [dia, setDia] = useState('Lunes');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [sede, setSede] = useState('');
  const [activo, setActivo] = useState(true);
  const [categorias, setCategorias] = useState<AdminCategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const fetchCategorias = async () => {
      const data = await readJson<{ categorias?: AdminCategoria[] }>('/api/categorias');
      if (!cancelled) {
        const items = data.categorias || [];
        setCategorias(items);
        if (items.length > 0) setCategoriaId(items[0].id);
      }
    };

    void fetchCategorias();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoriaId, dia, horaInicio, horaFin, sede, activo }),
      });
      if (!res.ok) throw new Error('Error');
      router.push('/admin/horarios');
    } catch {
      alert('Error al crear el horario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Editor</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Nuevo horario</h1>
        </div>
        <Link href="/admin/horarios" className="admin-button-light">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-6 p-8">
        <div>
          <label className="admin-label">Categoría</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className="admin-input" required>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Día</label>
          <select value={dia} onChange={(e) => setDia(e.target.value)} className="admin-input" required>
            {DIAS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="admin-label">Hora inicio</label>
            <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="admin-input" required />
          </div>
          <div>
            <label className="admin-label">Hora fin</label>
            <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} className="admin-input" required />
          </div>
        </div>
        <div>
          <label className="admin-label">Sede</label>
          <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} className="admin-input" required />
        </div>
        <div className="admin-card border border-black/6 px-5 py-5 shadow-none">
          <label className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
            <span className="font-semibold">Activo</span>
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => router.back()} className="admin-button-light">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="admin-button-dark disabled:opacity-50">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
