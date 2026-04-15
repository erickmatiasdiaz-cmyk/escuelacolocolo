import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET() {
  const configs = await prisma.configuracion.findMany();
  const configMap: Record<string, string> = {};
  configs.forEach((c) => {
    configMap[c.clave] = c.valor;
  });

  return NextResponse.json({ config: configMap });
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const updates = Array.isArray(body) ? body : [body];

  const results = await Promise.all(
    updates.map(async (item: { clave: string; valor: string }) => {
      return prisma.configuracion.upsert({
        where: { clave: item.clave },
        update: { valor: item.valor },
        create: item,
      });
    })
  );

  return NextResponse.json({ success: true, data: results });
}
