import { prisma } from '@/lib/prisma';

export async function getConfigMap() {
  const configs = await prisma.configuracion.findMany();

  return configs.reduce<Record<string, string>>((acc, item) => {
    acc[item.clave] = item.valor;
    return acc;
  }, {});
}
