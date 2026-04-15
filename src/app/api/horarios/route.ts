import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoriaId = searchParams.get('categoriaId');

  const where: Prisma.HorarioWhereInput = {};
  if (categoriaId) {
    where.categoriaId = categoriaId;
  }

  const horarios = await prisma.horario.findMany({
    where,
    include: { categoria: true },
    orderBy: [{ categoria: { orden: 'asc' } }, { dia: 'asc' }],
  });

  return NextResponse.json({ horarios });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const horario = await prisma.horario.create({
    data: body,
  });

  return NextResponse.json({ horario }, { status: 201 });
}
