'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function isLocalImage(src: string) {
  return src.startsWith('/');
}

export default function NuevaGaleriaPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden] = useState(0);
  const [activo, setActivo] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const raw = await res.text();
      const data = (raw ? JSON.parse(raw) : {}) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      if (data.url) setImagen(data.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/galeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, imagen, categoria, orden, activo }),
      });
      const raw = await res.text();
      const data = (raw ? JSON.parse(raw) : {}) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Error al crear');
      router.push('/admin/galeria');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al crear');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Editor</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Nueva foto</h1>
        </div>
        <Link href="/admin/galeria" className="admin-button-light">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-6 p-8">
        <div>
          <label className="admin-label">Título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="admin-input" required />
        </div>
        <div>
          <label className="admin-label">Descripción</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Imagen</label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="admin-input"
              placeholder="/uploads/imagen.jpg"
            />
            <label className="admin-button-dark cursor-pointer whitespace-nowrap">
              {uploading ? 'Subiendo...' : 'Subir archivo'}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
          {imagen ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-black/8">
              <div className="relative h-56 w-full bg-gray-100">
                {isLocalImage(imagen) ? (
                  <Image src={imagen} alt="Preview" fill className="object-cover" sizes="100vw" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagen} alt="Preview" className="h-full w-full object-cover" />
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="admin-label">Categoría</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Orden</label>
            <input type="number" value={orden} onChange={(e) => setOrden(Number(e.target.value))} className="admin-input" />
          </div>
          <div className="admin-card flex items-center border border-black/6 px-5 py-5 shadow-none">
            <label className="flex items-center gap-3 text-gray-700">
              <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
              <span className="font-semibold">Activa</span>
            </label>
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
