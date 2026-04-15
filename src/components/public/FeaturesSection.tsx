const features = [
  {
    icon: '01',
    kicker: 'Trayectoria',
    title: '+10 años elevando el nivel',
    description: 'Una academia con disciplina competitiva, identidad fuerte y una imagen que transmite club.',
  },
  {
    icon: '02',
    kicker: 'Metodología',
    title: 'Entrenamiento moderno y exigente',
    description: 'Cada sesión trabaja técnica, lectura del juego, coordinación y hábitos reales de formación.',
  },
  {
    icon: '03',
    kicker: 'Staff',
    title: 'Cuerpo técnico con criterio',
    description: 'Entrenadores que corrigen, acompañan y exigen con una línea clara de desarrollo.',
  },
  {
    icon: '04',
    kicker: 'Plan deportivo',
    title: 'Proceso por categorías',
    description: 'Desde iniciación hasta proyección juvenil, con metas concretas para cada etapa.',
  },
  {
    icon: '05',
    kicker: 'Entorno',
    title: 'Instalaciones con presencia',
    description: 'Un espacio ordenado, limpio y visualmente sólido, inspirado en una identidad clásica.',
  },
  {
    icon: '06',
    kicker: 'Formación integral',
    title: 'Carácter, confianza y mentalidad',
    description: 'No solo formamos jugadores: desarrollamos presencia, disciplina y compromiso.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="premium-shell py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="eyebrow">Nuestra propuesta</p>
          <h2 className="section-title">Una escuela con identidad, orden y ambición</h2>
          <p className="section-subtitle">
            Llevamos a la página una estética inspirada en una paleta clásica del fútbol: azul institucional,
            blanco limpio y rojo como acento de energía y competencia.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="card p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102a67] text-sm font-black tracking-[0.18em] text-white shadow-[0_12px_24px_rgba(16,42,103,0.22)]">
                  {feature.icon}
                </div>
                <span className="rounded-full border border-[#c41730]/20 bg-[#c41730]/8 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b3132c]">
                  {feature.kicker}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
