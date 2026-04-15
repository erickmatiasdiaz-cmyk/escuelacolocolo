'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { readJson, type AdminCategoria, type AdminHorario } from '../../../shared';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function EditarHorarioPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [categoriaId, setCategoriaId] = useState('');
  const [dia, setDia] = useState('Lunes');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [sede, setSede] = useState('');
  const [activo, setActivo] = useState(true);
  const [categorias, setCategorias] = useState<AdminCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const [categoriasData, horarioData] = await Promise.all([
        readJson<{ categorias?: AdminCategoria[] }>('/api/categorias'),
        fetch(`/api/horarios/${id}`),
      ]);

      if (!horarioData.ok) {
        router.push('/admin/horarios');
        return;
      }

      const horarioJson = (await horarioData.json()) as { horario: AdminHorario };
      const horario = horarioJson.horario;

      if (!cancelled) {
        setCategorias(categoriasData.categorias || []);
        setCategoriaId(horario.categoriaId);
        setDia(horario.dia);
        setHoraInicio(horario.horaInicio);
        setHoraFin(horario.horaFin);
        setSede(horario.sede || '');
        setActivo(horario.activo);
        setLoading(false);
      }
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/horarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoriaId, dia, horaInicio, horaFin, sede, activo }),
      });
      if (!res.ok) throw new Error('Error');
      router.push('/admin/horarios');
    } catch {
      alert('Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Editor</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Editar horario</h1>
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
          <button type="submit" disabled={saving} className="admin-button-dark disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar'}
          </button>
        </div>
      </form>
    </div>
  );
}
