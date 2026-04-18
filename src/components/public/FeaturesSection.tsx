import Image from 'next/image';

const pillars = [
  {
    number: '01',
    title: 'Entrenamiento con intención',
    description: 'Sesiones planificadas para técnica, lectura del juego, coordinación y hábitos competitivos.',
  },
  {
    number: '02',
    title: 'Proceso por etapas',
    description: 'Cada categoría trabaja con objetivos adecuados a su edad, nivel y proyección deportiva.',
  },
  {
    number: '03',
    title: 'Identidad de club',
    description: 'Un ambiente ordenado, exigente y reconocible que refuerza pertenencia desde el primer día.',
  },
];

const stats = [
  ['10+', 'años de formación'],
  ['4', 'categorías activas'],
  ['3', 'sesiones por semana'],
];

const details = [
  'Cuerpo técnico presente y cercano',
  'Corrección individual durante la práctica',
  'Disciplina, confianza y trabajo en equipo',
  'Comunicación clara con las familias',
];

export default function FeaturesSection() {
  return (
    <section className="premium-shell py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-[#071122] text-white shadow-[0_26px_70px_rgba(7,17,34,0.24)]">
            <Image
              src="/imagenes/fut3.jpg"
              alt="Entrenamiento de fútbol juvenil"
              fill
              className="object-cover opacity-58"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,34,0.24),rgba(7,17,34,0.92))]" />
            <div className="relative z-10 flex min-h-[560px] flex-col justify-end p-8 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--red-500)]">Nuestra propuesta</p>
              <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Fútbol formativo con orden, carácter y presencia.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/72">
                Más que sumar entrenamientos: construimos una experiencia seria, clara y motivante para jugadores y
                familias.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-md">
                    <p className="text-3xl font-black tracking-tight">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/52">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">Método</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-6xl">
              Una escuela que se entiende desde el primer entrenamiento
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              La propuesta combina exigencia deportiva, acompañamiento humano e identidad visual sólida. Todo está
              pensado para que el jugador sepa qué mejorar y la familia entienda el proceso.
            </p>

            <div className="mt-8 space-y-4">
              {pillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="grid gap-5 rounded-[1.4rem] border border-black/8 bg-white/82 px-6 py-6 shadow-[0_12px_34px_rgba(15,23,42,0.07)] sm:grid-cols-[4.5rem_1fr]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102a67] text-sm font-black tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(16,42,103,0.22)]">
                    {pillar.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">{pillar.title}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">{pillar.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {details.map((detail) => (
                <div key={detail} className="flex items-center gap-3 rounded-2xl bg-[#f4f7fd] px-4 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--red-600)] text-sm font-black text-white">
                    ✓
                  </span>
                  <span className="text-sm font-bold leading-6 text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
