import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { CategoriaListItem } from '@/lib/types';

async function getCategorias(): Promise<CategoriaListItem[]> {
  return prisma.categoria.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
    take: 4,
  });
}

export default async function CategoriasPreview() {
  const categorias = await getCategorias();

  if (categorias.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#102a67]" />
          <p className="text-sm font-semibold uppercase tracking-widest text-[#b3132c]">Nuestros programas</p>
          <div className="h-px w-12 bg-[#102a67]" />
        </div>
        <h2 className="section-title">Nuestras categorías</h2>
        <p className="section-subtitle">Programas adaptados para cada edad y nivel</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat) => (
            <div key={cat.id} className="card group overflow-hidden">
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#071122]">
                <span className="relative z-10 text-5xl text-white transition-transform duration-300 group-hover:scale-110">
                  ⚽
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#102a67]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-gray-900">{cat.nombre}</h3>
                {cat.descripcion ? <p className="mb-3 text-sm text-gray-600">{cat.descripcion}</p> : null}
                {cat.edadMinima !== null && cat.edadMaxima !== null ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-[#c41730] px-2 py-1 text-xs font-bold text-white">
                      {cat.edadMinima} - {cat.edadMaxima} años
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/categorias" className="btn-primary">
            Ver todas las categorías →
          </Link>
        </div>
      </div>
    </section>
  );
}
