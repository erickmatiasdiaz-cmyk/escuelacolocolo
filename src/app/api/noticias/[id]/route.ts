import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({
    where: { id },
  });

  if (!noticia) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const auth = await verifyAuth(request);
  const canViewDraft = auth.authorized;
  const isPublic = noticia.publicado && (!noticia.fechaPubli || noticia.fechaPubli <= new Date());

  if (!canViewDraft && !isPublic) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ noticia });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const noticia = await prisma.noticia.update({
    where: { id },
    data: {
      ...body,
      fechaPubli: body.fechaPubli ? new Date(body.fechaPubli) : undefined,
    },
  });

  return NextResponse.json({ noticia });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.noticia.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
