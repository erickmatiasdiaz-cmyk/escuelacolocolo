import PublicLayout from '@/components/public/PublicLayout';
import { getConfigMap } from '@/lib/content';

const canales = [
  { icon: '📍', title: 'Dirección', key: 'direccion', fallback: 'Av. Deportes 1234, Santiago' },
  { icon: '📞', title: 'Teléfono', key: 'telefono', fallback: '+56 9 1234 5678' },
  { icon: '✉️', title: 'Email', key: 'email', fallback: 'contacto@escuelafutbol.com' },
];

export default async function ContactoPage() {
  const config = await getConfigMap();

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-black py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Una atención alineada
            <span className="block text-[var(--red-600)]">con la calidad del proyecto</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Si quieres conocer la escuela, resolver dudas o pedir orientación para una categoría,
            te respondemos con claridad y rapidez.
          </p>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="glass-panel rounded-[2rem] p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--red-600)]">Contacto directo</p>
                <div className="mt-6 space-y-5">
                  {canales.map((canal) => (
                    <div key={canal.title} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(196,23,48,0.12)] text-2xl text-[var(--red-600)]">
                          {canal.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{canal.title}</p>
                          <p className="mt-2 text-base text-white/78">
                            {config[canal.key] || canal.fallback}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-[color:rgba(196,23,48,0.24)] bg-[color:rgba(196,23,48,0.12)] px-5 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--red-600)]">WhatsApp</p>
                  <a
                    href={`https://wa.me/${config.whatsapp || '56912345678'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-lg font-black text-white transition hover:text-[var(--red-600)]"
                  >
                    Iniciar conversación →
                  </a>
                </div>
              </div>

              <div className="card px-8 py-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--red-600)]">Redes</p>
                <div className="mt-5 flex gap-4">
                  {config.facebook ? (
                    <a
                      href={config.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-lg font-black text-white transition hover:bg-[var(--red-600)] hover:text-white"
                    >
                      f
                    </a>
                  ) : null}
                  {config.instagram ? (
                    <a
                      href={config.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white transition hover:bg-[var(--red-600)] hover:text-white"
                    >
                      ⌾
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="card px-8 py-10 md:px-10">
              <p className="eyebrow">Solicitud</p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900">Pide información</h2>
              <p className="mt-4 text-base leading-8 text-gray-600">
                Déjanos tus datos y te contactaremos para orientarte sobre categorías, horarios y proceso de ingreso.
              </p>

              <form className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-[var(--red-600)] focus:ring-2 focus:ring-[color:rgba(196,23,48,0.24)]"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-[var(--red-600)] focus:ring-2 focus:ring-[color:rgba(196,23,48,0.24)]"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-[var(--red-600)] focus:ring-2 focus:ring-[color:rgba(196,23,48,0.24)]"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-[var(--red-600)] focus:ring-2 focus:ring-[color:rgba(196,23,48,0.24)]"
                    placeholder="Cuéntanos qué categoría te interesa o qué necesitas saber."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Enviar solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
