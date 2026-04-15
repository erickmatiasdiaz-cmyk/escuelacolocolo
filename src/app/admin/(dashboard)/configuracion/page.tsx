'use client';

import { useEffect, useState } from 'react';
import { readJson } from '../shared';

type FieldType = 'text' | 'email' | 'url' | 'textarea';

interface ConfigField {
  clave: string;
  label: string;
  tipo: FieldType;
}

interface ConfigGroup {
  grupo: string;
  label: string;
  fields: ConfigField[];
}

const configFields: ConfigGroup[] = [
  {
    grupo: 'general',
    label: 'General',
    fields: [
      { clave: 'nombre_escuela', label: 'Nombre de la escuela', tipo: 'text' },
      { clave: 'telefono', label: 'Teléfono', tipo: 'text' },
      { clave: 'email', label: 'Email', tipo: 'email' },
      { clave: 'direccion', label: 'Dirección', tipo: 'text' },
      { clave: 'whatsapp', label: 'WhatsApp', tipo: 'text' },
      { clave: 'facebook', label: 'URL Facebook', tipo: 'url' },
      { clave: 'instagram', label: 'URL Instagram', tipo: 'url' },
    ],
  },
  {
    grupo: 'hero',
    label: 'Página de inicio - Hero',
    fields: [
      { clave: 'hero_titulo', label: 'Título del hero', tipo: 'text' },
      { clave: 'hero_subtitulo', label: 'Subtítulo', tipo: 'textarea' },
    ],
  },
  {
    grupo: 'nosotros',
    label: 'Página Nosotros',
    fields: [
      { clave: 'nosotros_titulo', label: 'Título', tipo: 'text' },
      { clave: 'nosotros_contenido', label: 'Contenido', tipo: 'textarea' },
      { clave: 'nosotros_mision', label: 'Misión', tipo: 'textarea' },
      { clave: 'nosotros_vision', label: 'Visión', tipo: 'textarea' },
    ],
  },
];

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchConfig = async () => {
      try {
        const data = await readJson<{ config?: Record<string, string> }>('/api/config');
        if (!cancelled) {
          setConfig(data.config || {});
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (clave: string, valor: string) => {
    setConfig((prev) => ({ ...prev, [clave]: valor }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = configFields.flatMap((group) =>
        group.fields.map((field) => ({
          clave: field.clave,
          valor: config[field.clave] || '',
        }))
      );

      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Error');
      alert('Configuración guardada');
    } catch {
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-600">Gestión</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">Configuración</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-button-dark disabled:opacity-50">
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <div className="space-y-6">
        {configFields.map((group) => (
          <section key={group.grupo} className="admin-card px-7 py-7">
            <h2 className="text-2xl font-black tracking-tight text-gray-900">{group.label}</h2>
            <div className="mt-6 grid gap-5">
              {group.fields.map((field) => (
                <div key={field.clave}>
                  <label className="admin-label">{field.label}</label>
                  {field.tipo === 'textarea' ? (
                    <textarea
                      value={config[field.clave] || ''}
                      onChange={(e) => handleChange(field.clave, e.target.value)}
                      rows={4}
                      className="admin-input"
                    />
                  ) : (
                    <input
                      type={field.tipo}
                      value={config[field.clave] || ''}
                      onChange={(e) => handleChange(field.clave, e.target.value)}
                      className="admin-input"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
