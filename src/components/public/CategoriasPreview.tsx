import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { CategoriaListItem } from '@/lib/types';

const focusByOrder = [
  'Primer contacto con el balón, coordinación y juego guiado.',
  'Técnica base, confianza y comprensión de espacios.',
  'Ritmo competitivo, lectura táctica y toma de decisiones.',
  'Preparación física, intensidad y mentalidad de competencia.',
];

async function getCategorias(): Promise<CategoriaListItem[]> {
  return prisma.categoria.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
    include: { _count: { select: { horarios: true } } },
    take: 4,
  });
}

function ageLabel(cat: CategoriaListItem) {
  if (cat.edadMinima === null || cat.edadMaxima === null) return 'Edad por evaluar';
  return `${cat.edadMinima} - ${cat.edadMaxima} años`;
}

export default async function CategoriasPreview() {
  const categorias = await getCategorias();

  if (categorias.length === 0) return null;

  const firstCategory = categorias[0];

  return (
    <section className="bg-[#f4f7fd] py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow">Nuestros programas</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-6xl">
              Categorías pensadas para crecer paso a paso
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-600">
              Cada grupo tiene un objetivo formativo concreto. Partimos desde la confianza y el juego, y avanzamos hacia
              técnica, criterio e intensidad competitiva.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#071122] p-7 text-white shadow-[0_24px_60px_rgba(7,17,34,0.2)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-500)]">Punto de partida</p>
            <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h3 className="text-3xl font-black tracking-tight">{firstCategory.nombre}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/68">
                  {firstCategory.descripcion || focusByOrder[0]}
                </p>
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 text-[#071122]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Edad</p>
                <p className="mt-1 text-2xl font-black">{ageLabel(firstCategory)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categorias.map((cat, index) => (
            <article
              key={cat.id}
              className="group rounded-[1.5rem] border border-black/8 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102a67] text-sm font-black tracking-[0.14em] text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="rounded-full border border-[#c41730]/18 bg-[#c41730]/8 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#b3132c]">
                  {ageLabel(cat)}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-black tracking-tight text-gray-900">{cat.nombre}</h3>
              <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-gray-600">
                {cat.descripcion || focusByOrder[index] || 'Proceso formativo con objetivos claros por etapa.'}
              </p>

              <div className="mt-5 border-t border-black/8 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Foco de trabajo</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-gray-800">
                  {focusByOrder[index] || 'Formación técnica y hábitos competitivos.'}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#f4f7fd] px-4 py-3">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">Horarios</span>
                <span className="text-sm font-black text-[#102a67]">{cat._count?.horarios || 0} activos</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-[1.6rem] bg-white px-6 py-6 shadow-[0_12px_34px_rgba(15,23,42,0.07)] md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-gray-900">¿No sabes cuál corresponde?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Te orientamos según edad, experiencia previa y disponibilidad familiar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/categorias" className="admin-button-light">
              Ver todas
            </Link>
            <Link href="/contacto" className="btn-primary">
              Pedir orientación
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
