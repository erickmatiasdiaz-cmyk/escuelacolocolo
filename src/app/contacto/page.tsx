import Image from 'next/image';
import ContactForm from '@/components/public/ContactForm';
import MovingBall from '@/components/public/MovingBall';
import PublicLayout from '@/components/public/PublicLayout';
import { getConfigMap } from '@/lib/content';

type IconName = 'pin' | 'phone' | 'mail' | 'clock' | 'message' | 'facebook' | 'instagram';

const fallbackContact = {
  direccion: 'Santa Bárbara, Región del Biobío',
  telefono: '+56 9 1234 5678',
  email: 'contacto@colocolosantabarbara.cl',
  whatsapp: '56912345678',
};

function Icon({ name }: { name: IconName }) {
  const props = {
    className: 'h-6 w-6',
    fill: 'none',
    height: 24,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    width: 24,
  };

  if (name === 'phone') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  if (name === 'mail') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === 'message') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-8 8H6l-3 2 1.2-4.2A8 8 0 1 1 21 12Z" />
      </svg>
    );
  }

  if (name === 'facebook') {
    return (
      <svg {...props} aria-hidden="true">
        <path d="M14 8h2V4h-2a4 4 0 0 0-4 4v3H8v4h2v6h4v-6h2.5l.5-4h-3V8a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }

  if (name === 'instagram') {
    return (
      <svg {...props} aria-hidden="true">
        <rect width="16" height="16" x="4" y="4" rx="4" />
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M17 7.5h.01" />
      </svg>
    );
  }

  return (
    <svg {...props} aria-hidden="true">
      <path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" />
      <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

export default async function ContactoPage() {
  const config = await getConfigMap();
  const whatsappNumber = (config.whatsapp || fallbackContact.whatsapp).replace(/\D/g, '');

  const canales = [
    { icon: 'pin' as const, title: 'Direccion', value: config.direccion || fallbackContact.direccion },
    { icon: 'phone' as const, title: 'Telefono', value: config.telefono || fallbackContact.telefono },
    { icon: 'mail' as const, title: 'Email', value: config.email || fallbackContact.email },
  ];

  return (
    <PublicLayout>
      <section className="relative isolate min-h-[52vh] overflow-hidden bg-black text-white">
        <Image src="/imagenes/fut2.png" alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,16,0.96),rgba(5,8,16,0.68),rgba(5,8,16,0.3))]" />
        <MovingBall />
        <div className="container relative z-10 mx-auto flex min-h-[52vh] items-center px-4 py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Contacto</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-tight md:text-7xl">
              Hablemos del siguiente entrenamiento
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Te orientamos por edad, nivel y disponibilidad para que el ingreso a la escuela sea claro desde el
              primer mensaje.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#solicitud" className="btn-primary">
                Pedir informacion
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp directo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="solicitud" className="premium-shell py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <aside className="overflow-hidden rounded-[2rem] bg-[#071122] text-white shadow-[0_24px_70px_rgba(7,17,34,0.22)]">
              <div className="border-b border-white/10 px-8 py-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-600)]">Contacto directo</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight">Respuesta simple y cercana</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Escríbenos con los datos del jugador y te indicamos categoría, horarios y próximos pasos.
                </p>
              </div>

              <div className="divide-y divide-white/10 px-8">
                {canales.map((canal) => (
                  <div key={canal.title} className="flex gap-4 py-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-[var(--red-600)]">
                      <Icon name={canal.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/42">{canal.title}</p>
                      <p className="mt-2 break-words text-base font-semibold text-white/86">{canal.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-8 pb-8">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[color:rgba(196,23,48,0.32)] bg-[color:rgba(196,23,48,0.16)] px-5 py-4 font-black text-white transition hover:bg-[var(--red-600)]"
                >
                  <span>Iniciar conversacion</span>
                  <Icon name="message" />
                </a>
              </div>
            </aside>

            <div className="rounded-[2rem] border border-black/8 bg-white px-6 py-8 shadow-[0_18px_55px_rgba(15,23,42,0.1)] md:px-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-600)]">Solicitud</p>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <h2 className="text-4xl font-black tracking-tight text-gray-900">Pide información</h2>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-gray-600">
                    Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f4f7fd] px-5 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3 font-black text-gray-900">
                    <Icon name="clock" />
                    24 horas
                  </div>
                  <p className="mt-2 leading-6">Tiempo habitual de respuesta</p>
                </div>
              </div>

              <div className="mt-8">
                <ContactForm whatsappNumber={whatsappNumber} />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['1', 'Cuéntanos la edad', 'Con eso ubicamos el grupo más adecuado.'],
              ['2', 'Revisamos horarios', 'Te mostramos opciones disponibles por sede y categoría.'],
              ['3', 'Coordinamos prueba', 'Agendamos una visita o entrenamiento inicial.'],
            ].map(([step, title, copy]) => (
              <div key={step} className="rounded-[1.4rem] border border-black/8 bg-white/76 px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102a67] text-sm font-black text-white">
                  {step}
                </div>
                <h3 className="mt-4 text-xl font-black tracking-tight text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[1.6rem] bg-[#071122] px-6 py-6 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-600)]">Redes</p>
              <p className="mt-2 text-sm text-white/62">También puedes seguir la actividad de la escuela.</p>
            </div>
            <div className="flex gap-3">
              {config.facebook ? (
                <a
                  href={config.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-white transition hover:bg-[var(--red-600)]"
                  aria-label="Facebook"
                >
                  <Icon name="facebook" />
                </a>
              ) : null}
              {config.instagram ? (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-white transition hover:bg-[var(--red-600)]"
                  aria-label="Instagram"
                >
                  <Icon name="instagram" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
