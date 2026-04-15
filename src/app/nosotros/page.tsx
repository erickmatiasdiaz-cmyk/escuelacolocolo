import BrandLogo from '@/components/public/BrandLogo';
import PublicLayout from '@/components/public/PublicLayout';
import { getConfigMap } from '@/lib/content';

const valores = [
  { icon: 'Disciplina', title: 'Disciplina', desc: 'Orden, constancia y respeto por el proceso en cada sesión.' },
  { icon: 'Equipo', title: 'Equipo', desc: 'Competimos mejor cuando el grupo se siente unido y fuerte.' },
  { icon: 'Mentalidad', title: 'Mentalidad', desc: 'Entrenamos confianza, concentración y toma de decisiones.' },
  { icon: 'Excelencia', title: 'Excelencia', desc: 'Buscamos estándares altos en forma, fondo y actitud.' },
];

export default async function NosotrosPage() {
  const config = await getConfigMap();

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-[#071122] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,42,103,0.24),transparent_24%),radial-gradient(circle_at_right,rgba(196,23,48,0.18),transparent_24%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <BrandLogo size={86} className="border-white/20" />
            </div>
            <p className="mt-6 eyebrow">Identidad</p>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
              Una escuela con presencia,
              <span className="block text-[#d11d38]">método y visión de club</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
              {config.nosotros_contenido ||
                'Somos una escuela de fútbol con más de 10 años de experiencia formando jugadores.'}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="glass-panel rounded-[2rem] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Misión</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Formación seria, humana y competitiva</h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                {config.nosotros_mision || 'Formar jugadores integrales con valores deportivos y humanos.'}
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#102a67]/10 bg-white/96 p-8 shadow-[0_18px_45px_rgba(10,10,10,0.08)]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#b3132c]">Visión</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900">Ser referencia regional</h2>
              <p className="mt-5 text-base leading-8 text-gray-600">
                {config.nosotros_vision || 'Ser la escuela de fútbol líder de la región.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-10">
              <p className="eyebrow">Nuestro estilo</p>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900">
                Más que entrenamientos:
                <span className="block text-[#102a67]">una experiencia con identidad real</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-gray-600">
                <p>
                  Cuidamos la imagen, la exigencia y el ambiente para que cada jugador sienta que entrena
                  en un lugar con ambición, estructura y propósito.
                </p>
                <p>
                  El proyecto combina formación técnica, acompañamiento humano y una identidad visual
                  inspirada en una paleta clásica, fuerte y reconocible.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                ['Metodología', 'Sesiones con foco en técnica, lectura de juego y hábitos competitivos.'],
                ['Cultura', 'Orden, energía, exigencia y sentido de pertenencia dentro y fuera de la cancha.'],
                ['Proyección', 'Cada categoría trabaja con metas acordes a su etapa de desarrollo.'],
              ].map(([title, desc]) => (
                <div key={title} className="card px-7 py-7">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b3132c]">{title}</p>
                  <p className="mt-3 text-base leading-7 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fd] py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="eyebrow">Valores</p>
            <h2 className="section-title">La base de todo lo que construimos</h2>
            <p className="section-subtitle">
              La estética acompaña, pero lo que sostiene el proyecto es una cultura clara, disciplinada y competitiva.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valores.map((valor) => (
              <div key={valor.title} className="card p-7 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#102a67] text-xs font-black uppercase tracking-[0.18em] text-white">
                  {valor.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900">{valor.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-600">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
