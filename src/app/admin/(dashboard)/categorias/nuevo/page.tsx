'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NuevaCategoriaPage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [edadMinima, setEdadMinima] = useState(4);
  const [edadMaxima, setEdadMaxima] = useState(6);
  const [imagen, setImagen] = useState('');
  const [activo, setActivo] = useState(true);
  const [orden, setOrden] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion, edadMinima, edadMaxima, imagen, activo, orden }),
      });
      if (!res.ok) throw new Error('Error');
      router.push('/admin/categorias');
    } catch {
      alert('Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Editor</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Nueva categoría</h1>
        </div>
        <Link href="/admin/categorias" className="admin-button-light">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-6 p-8">
        <div>
          <label className="admin-label">Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="admin-input" required />
        </div>
        <div>
          <label className="admin-label">Descripción</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} className="admin-input" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="admin-label">Edad mínima</label>
            <input type="number" value={edadMinima} onChange={(e) => setEdadMinima(Number(e.target.value))} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Edad máxima</label>
            <input type="number" value={edadMaxima} onChange={(e) => setEdadMaxima(Number(e.target.value))} className="admin-input" />
          </div>
        </div>
        <div>
          <label className="admin-label">URL imagen</label>
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} className="admin-input" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="admin-card border border-black/6 px-5 py-5 shadow-none">
            <label className="flex items-center gap-3 text-gray-700">
              <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
              <span className="font-semibold">Activa</span>
            </label>
          </div>
          <div>
            <label className="admin-label">Orden</label>
            <input type="number" value={orden} onChange={(e) => setOrden(Number(e.target.value))} className="admin-input" />
          </div>
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
