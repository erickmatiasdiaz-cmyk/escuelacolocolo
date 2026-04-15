import Image from 'next/image';
import PublicLayout from '@/components/public/PublicLayout';
import { prisma } from '@/lib/prisma';
import type { GaleriaItem } from '@/lib/types';

function isLocalImage(src: string) {
  return src.startsWith('/');
}

async function getGaleria(): Promise<GaleriaItem[]> {
  return prisma.galeria.findMany({
    where: { activo: true },
    orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
  });
}

export default async function GaleriaPage() {
  const galeria = await getGaleria();

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-black py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="eyebrow">Galería</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Una identidad visual
            <span className="block text-yellow-400">que se siente grande</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Más que fotos: una muestra del ambiente, la energía y la puesta en escena que define a la escuela.
          </p>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          {galeria.length === 0 ? (
            <p className="text-center text-gray-600">No hay fotos en la galería aún.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {galeria.map((item, index) => (
                <article
                  key={item.id}
                  className={`card group overflow-hidden ${index % 5 === 0 ? 'xl:col-span-2' : ''}`}
                >
                  <div className={`relative overflow-hidden ${index % 5 === 0 ? 'h-80' : 'h-72'}`}>
                    {isLocalImage(item.imagen) ? (
                      <Image
                        src={item.imagen}
                        alt={item.titulo}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1280px) 50vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {item.categoria ? (
                        <span className="rounded-full border border-yellow-400/35 bg-yellow-400/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                          {item.categoria}
                        </span>
                      ) : null}
                      <h2 className="mt-4 text-3xl font-black tracking-tight">{item.titulo}</h2>
                      {item.descripcion ? (
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">{item.descripcion}</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
