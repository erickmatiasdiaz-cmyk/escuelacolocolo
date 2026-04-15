import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET() {
  const contactos = await prisma.contacto.findMany({
    orderBy: { orden: 'asc' },
  });

  return NextResponse.json({ contactos });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const contacto = await prisma.contacto.create({
    data: body,
  });

  return NextResponse.json({ contacto }, { status: 201 });
}
