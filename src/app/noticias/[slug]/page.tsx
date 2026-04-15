import Image from 'next/image';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/public/PublicLayout';
import { prisma } from '@/lib/prisma';

function isLocalImage(src: string) {
  return src.startsWith('/');
}

async function getNoticia(slug: string) {
  try {
    return await prisma.noticia.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);

  if (!noticia || !noticia.publicado) {
    notFound();
  }

  return (
    <PublicLayout>
      <article className="pb-24">
        <section className="relative overflow-hidden bg-black py-24 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center">
            <p className="eyebrow">Noticia</p>
            <div className="mt-5 text-sm uppercase tracking-[0.2em] text-white/52">
              {new Date(noticia.fechaPubli || noticia.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">{noticia.titulo}</h1>
            {noticia.resumen ? (
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">{noticia.resumen}</p>
            ) : null}
          </div>
        </section>

        <div className="container mx-auto -mt-10 max-w-5xl px-4">
          {noticia.imagen ? (
            <div className="card relative mb-10 overflow-hidden rounded-[2rem]">
              <div className="relative h-[420px] overflow-hidden">
                {isLocalImage(noticia.imagen) ? (
                  <Image
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 960px, 100vw"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={noticia.imagen} alt={noticia.titulo} className="h-full w-full object-cover" />
                )}
              </div>
            </div>
          ) : null}

          <div className="card px-8 py-10 md:px-12 md:py-14">
            <div className="prose prose-lg max-w-none text-gray-700">
              {noticia.contenido.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-5 text-[1.06rem] leading-8 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
