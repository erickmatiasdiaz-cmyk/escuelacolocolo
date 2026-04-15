import Image from 'next/image';
import Link from 'next/link';
import PublicLayout from '@/components/public/PublicLayout';
import { prisma } from '@/lib/prisma';
import type { NoticiaListItem } from '@/lib/types';

function isLocalImage(src: string) {
  return src.startsWith('/');
}

async function getNoticias(): Promise<NoticiaListItem[]> {
  return prisma.noticia.findMany({
    where: {
      publicado: true,
      OR: [{ fechaPubli: null }, { fechaPubli: { lte: new Date() } }],
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();
  const [destacada, ...resto] = noticias;

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-black py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="eyebrow">Noticias</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            El relato de una escuela
            <span className="block text-[var(--red-600)]">que cuida cada detalle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Novedades, hitos y contenido para reforzar la percepción de nivel, actividad y proyección del proyecto.
          </p>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          {noticias.length === 0 ? (
            <p className="text-center text-gray-600">No hay noticias publicadas aún.</p>
          ) : (
            <div className="space-y-10">
              {destacada ? (
                <article className="card overflow-hidden">
                  <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative min-h-[420px] overflow-hidden">
                      {destacada.imagen ? (
                        isLocalImage(destacada.imagen) ? (
                          <Image
                            src={destacada.imagen}
                            alt={destacada.titulo}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 55vw, 100vw"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={destacada.imagen} alt={destacada.titulo} className="h-full w-full object-cover" loading="lazy" />
                        )
                      ) : (
                        <div className="h-full w-full bg-[linear-gradient(135deg,#050505,#1a1a1a)]" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--red-600)]">Destacada</p>
                      <div className="mt-4 text-sm text-gray-500">
                        {new Date(destacada.fechaPubli || destacada.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h2 className="mt-4 text-4xl font-black tracking-tight text-gray-900">{destacada.titulo}</h2>
                      {destacada.resumen ? (
                        <p className="mt-5 text-base leading-8 text-gray-600">{destacada.resumen}</p>
                      ) : null}
                      <div className="mt-8">
                        <Link href={`/noticias/${destacada.slug}`} className="btn-primary">
                          Leer noticia
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ) : null}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {resto.map((noticia) => (
                  <article key={noticia.id} className="card overflow-hidden">
                    {noticia.imagen ? (
                      <div className="relative h-52 overflow-hidden bg-gray-200">
                        {isLocalImage(noticia.imagen) ? (
                          <Image
                            src={noticia.imagen}
                            alt={noticia.titulo}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={noticia.imagen} alt={noticia.titulo} className="h-full w-full object-cover" loading="lazy" />
                        )}
                      </div>
                    ) : null}
                    <div className="p-6">
                      <div className="text-sm text-gray-500">
                        {new Date(noticia.fechaPubli || noticia.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-gray-900">{noticia.titulo}</h3>
                      {noticia.resumen ? (
                        <p className="mt-4 line-clamp-4 text-base leading-7 text-gray-600">{noticia.resumen}</p>
                      ) : null}
                      <Link
                        href={`/noticias/${noticia.slug}`}
                        className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.18em] text-[var(--red-600)] transition hover:text-black"
                      >
                        Leer más
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
