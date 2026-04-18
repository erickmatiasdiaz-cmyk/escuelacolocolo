'use client';

import { useState } from 'react';

type ContactFormProps = {
  whatsappNumber: string;
};

const inputClass =
  'w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--red-600)] focus:ring-4 focus:ring-[color:rgba(196,23,48,0.16)]';

export default function ContactForm({ whatsappNumber }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nombre = String(formData.get('nombre') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const telefono = String(formData.get('telefono') || '').trim();
    const categoria = String(formData.get('categoria') || '').trim();
    const mensaje = String(formData.get('mensaje') || '').trim();

    const text = [
      'Hola, quiero recibir informacion sobre la escuela.',
      nombre ? `Nombre: ${nombre}` : '',
      email ? `Email: ${email}` : '',
      telefono ? `Telefono: ${telefono}` : '',
      categoria ? `Categoria de interes: ${categoria}` : '',
      mensaje ? `Mensaje: ${mensaje}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">
          Nombre completo
        </label>
        <input name="nombre" type="text" className={inputClass} placeholder="Tu nombre" required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">Email</label>
          <input name="email" type="email" className={inputClass} placeholder="tu@email.com" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">Telefono</label>
          <input name="telefono" type="tel" className={inputClass} placeholder="+56 9 1234 5678" required />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">
          Categoria de interes
        </label>
        <select name="categoria" className={inputClass} defaultValue="">
          <option value="" disabled>
            Selecciona una opcion
          </option>
          <option value="Pre-Infantil">Pre-Infantil</option>
          <option value="Infantil">Infantil</option>
          <option value="Juvenil A">Juvenil A</option>
          <option value="Juvenil B">Juvenil B</option>
          <option value="No estoy seguro">No estoy seguro</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-gray-500">Mensaje</label>
        <textarea
          name="mensaje"
          rows={5}
          className={inputClass}
          placeholder="Cuentanos la edad del jugador, experiencia previa o dudas principales."
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Enviar por WhatsApp
      </button>

      {sent ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          Se abrio WhatsApp con tu solicitud lista para enviar.
        </p>
      ) : null}
    </form>
  );
}
