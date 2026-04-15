import BrandLogo from '@/components/public/BrandLogo';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#071122] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,42,103,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(196,23,48,0.16),transparent_22%)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="glass-panel rounded-[2rem] border border-white/10 px-8 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:px-12 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center">
              <BrandLogo size={70} className="border-white/20" />
            </div>
            <p className="mt-6 eyebrow">Únete al proyecto</p>
            <h2 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Una escuela con identidad fuerte y presencia de club
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Si buscas una escuela con una imagen seria, una paleta reconocible y un trabajo deportivo
              consistente, este es el lugar correcto para comenzar.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contacto" className="btn-primary">
                Solicitar información
              </Link>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Hablar por WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
              {[
                ['Evaluación inicial', 'Te orientamos según edad, nivel y proyección deportiva.'],
                ['Plan por categoría', 'Ubicamos al jugador en el grupo adecuado para su etapa.'],
                ['Ingreso acompañado', 'La experiencia comienza con una identidad clara desde el primer día.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/6 px-5 py-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d11d38]">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d11d38] to-transparent" />
    </section>
  );
}
