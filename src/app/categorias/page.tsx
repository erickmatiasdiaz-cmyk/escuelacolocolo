import BrandLogo from '@/components/public/BrandLogo';
import PublicLayout from '@/components/public/PublicLayout';
import { prisma } from '@/lib/prisma';
import type { CategoriaListItem } from '@/lib/types';
import Link from 'next/link';

async function getCategorias(): Promise<CategoriaListItem[]> {
  return prisma.categoria.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
    include: { _count: { select: { horarios: true } } },
  });
}

export default async function CategoriasPage() {
  const categorias = await getCategorias();

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-[#071122] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,42,103,0.24),transparent_26%),radial-gradient(circle_at_right,rgba(196,23,48,0.16),transparent_22%)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="flex justify-center">
            <BrandLogo size={82} className="border-white/20" />
          </div>
          <p className="mt-6 eyebrow">Categorías</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Programas diseñados
            <span className="block text-[#d11d38]">para cada etapa del jugador</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Cada grupo tiene objetivos, lenguaje y nivel de exigencia propios para que el progreso se sienta
            real, medible y motivante.
          </p>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          {categorias.length === 0 ? (
            <p className="text-center text-gray-600">No hay categorías disponibles aún.</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {categorias.map((cat, index) => (
                <article key={cat.id} className="card overflow-hidden">
                  <div className="relative border-b border-[#102a67]/10 bg-[linear-gradient(135deg,#071122,#102a67)] px-8 py-10 text-white">
                    <div className="absolute right-6 top-6 rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Nivel {index + 1}
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Categoría</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight">{cat.nombre}</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                      {cat.descripcion || 'Proceso formativo con enfoque técnico, físico y competitivo.'}
                    </p>
                  </div>

                  <div className="grid gap-5 px-8 py-8 md:grid-cols-[1fr_auto] md:items-end">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {cat.edadMinima !== null && cat.edadMaxima !== null ? (
                          <span className="rounded-full border border-[#c41730]/18 bg-[#c41730]/8 px-4 py-2 text-sm font-bold text-[#b3132c]">
                            {cat.edadMinima} - {cat.edadMaxima} años
                          </span>
                        ) : null}
                        {cat._count?.horarios ? (
                          <span className="rounded-full border border-[#102a67]/10 bg-[#102a67] px-4 py-2 text-sm font-bold text-white">
                            {cat._count.horarios} horarios disponibles
                          </span>
                        ) : null}
                      </div>
                      <p className="text-base leading-7 text-gray-600">
                        Un entorno visualmente sólido, entrenamientos con estructura y una experiencia
                        acorde al momento formativo del jugador.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Estado</div>
                      <div className="mt-2 text-lg font-black text-gray-900">
                        {cat.activo ? 'Cupos abiertos' : 'Cerrado'}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f4f7fd] py-20">
        <div className="container mx-auto px-4">
          <div className="card px-8 py-10 text-center md:px-12">
            <p className="eyebrow">Orientación</p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900">Te ayudamos a elegir la categoría ideal</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600">
              Si no sabes dónde encaja mejor tu hijo o hija, te orientamos según edad, experiencia y objetivos.
            </p>
            <div className="mt-8">
              <Link href="/contacto" className="btn-primary">
                Solicitar orientación
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
