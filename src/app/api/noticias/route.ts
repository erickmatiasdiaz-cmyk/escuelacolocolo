import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const published = searchParams.get('published');
  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const limit = Number.parseInt(searchParams.get('limit') || '10', 10);
  const skip = Math.max(0, (page - 1) * limit);

  const where: Prisma.NoticiaWhereInput = {};
  if (published === 'true') {
    where.publicado = true;
    where.fechaPubli = { lte: new Date() };
  }

  const [noticias, total] = await Promise.all([
    prisma.noticia.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.noticia.count({ where }),
  ]);

  return NextResponse.json({
    noticias,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { titulo, slug, contenido, resumen, imagen, publicado, fechaPubli } = body;

  const noticia = await prisma.noticia.create({
    data: {
      titulo,
      slug,
      contenido,
      resumen,
      imagen,
      publicado: Boolean(publicado),
      fechaPubli: fechaPubli ? new Date(fechaPubli) : null,
    },
  });

  return NextResponse.json({ noticia }, { status: 201 });
}
