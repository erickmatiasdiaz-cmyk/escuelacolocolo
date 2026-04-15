import Image from 'next/image';
import Link from 'next/link';
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
    take: 3,
  });
}

export default async function NoticiasRecientes() {
  const noticias = await getNoticias();

  if (noticias.length === 0) return null;

  return (
    <section className="bg-[#f4f7fd] py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Últimas noticias</h2>
        <p className="section-subtitle">Mantente al día con las novedades de nuestra escuela</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="card overflow-hidden">
              {noticia.imagen ? (
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {isLocalImage(noticia.imagen) ? (
                    <Image
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              ) : null}
              <div className="p-5">
                <div className="mb-2 text-sm text-gray-500">
                  {new Date(noticia.fechaPubli || noticia.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">{noticia.titulo}</h3>
                {noticia.resumen ? (
                  <p className="mb-3 line-clamp-3 text-sm text-gray-600">{noticia.resumen}</p>
                ) : null}
                <Link
                  href={`/noticias/${noticia.slug}`}
                  className="font-semibold text-[#102a67] transition hover:text-[#c41730]"
                >
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/noticias" className="btn-primary">
            Ver todas las noticias →
          </Link>
        </div>
      </div>
    </section>
  );
}
