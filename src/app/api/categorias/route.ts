import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { orden: 'asc' },
    include: { _count: { select: { horarios: true } } },
  });

  return NextResponse.json({ categorias });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const categoria = await prisma.categoria.create({
    data: body,
  });

  return NextResponse.json({ categoria }, { status: 201 });
}
