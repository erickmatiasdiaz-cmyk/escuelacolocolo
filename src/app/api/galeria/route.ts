import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get('categoria');
  const activo = searchParams.get('activo');

  const where: Prisma.GaleriaWhereInput = {};
  if (categoria) where.categoria = categoria;
  if (activo === 'true') where.activo = true;

  const galeria = await prisma.galeria.findMany({
    where,
    orderBy: [{ orden: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ galeria });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const item = await prisma.galeria.create({
      data: body,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Galeria create error:', error);

    return NextResponse.json(
      {
        error:
          'No se pudo guardar en producción. Con SQLite en Vercel las escrituras del panel pueden fallar. Para guardar fotos y cambios del admin, hay que mover la base a Postgres o similar.',
      },
      { status: 500 }
    );
  }
}
