'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarNoticiaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [titulo, setTitulo] = useState('');
  const [slug, setSlug] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState('');
  const [publicado, setPublicado] = useState(false);
  const [fechaPubli, setFechaPubli] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNoticia = async () => {
      const res = await fetch(`/api/noticias/${id}`);
      if (!res.ok) {
        router.push('/admin/noticias');
        return;
      }
      const data = await res.json();
      const noticia = data.noticia;
      setTitulo(noticia.titulo);
      setSlug(noticia.slug);
      setResumen(noticia.resumen || '');
      setContenido(noticia.contenido);
      setImagen(noticia.imagen || '');
      setPublicado(noticia.publicado);
      if (noticia.fechaPubli) setFechaPubli(new Date(noticia.fechaPubli).toISOString().slice(0, 16));
      setLoading(false);
    };
    void fetchNoticia();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/noticias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, slug, resumen, contenido, imagen, publicado, fechaPubli: fechaPubli || null }),
      });
      if (!res.ok) throw new Error('Error');
      router.push('/admin/noticias');
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
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Editar noticia</h1>
        </div>
        <Link href="/admin/noticias" className="admin-button-light">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-6 p-8">
        <div>
          <label className="admin-label">Título</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="admin-input" required />
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="admin-input" required />
        </div>
        <div>
          <label className="admin-label">Resumen</label>
          <textarea value={resumen} onChange={(e) => setResumen(e.target.value)} rows={3} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Contenido</label>
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} rows={12} className="admin-input" required />
        </div>
        <div>
          <label className="admin-label">URL de imagen</label>
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} className="admin-input" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="admin-card border border-black/6 px-5 py-5 shadow-none">
            <label className="flex items-center gap-3 text-gray-700">
              <input type="checkbox" checked={publicado} onChange={(e) => setPublicado(e.target.checked)} />
              <span className="font-semibold">Publicado</span>
            </label>
          </div>
          <div>
            <label className="admin-label">Fecha de publicación</label>
            <input type="datetime-local" value={fechaPubli} onChange={(e) => setFechaPubli(e.target.value)} className="admin-input" />
          </div>
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
