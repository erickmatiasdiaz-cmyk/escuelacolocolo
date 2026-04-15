import PublicLayout from '@/components/public/PublicLayout';
import { prisma } from '@/lib/prisma';
import type { HorarioListItem } from '@/lib/types';

const diasOrden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

async function getHorarios(): Promise<HorarioListItem[]> {
  return prisma.horario.findMany({
    where: { activo: true },
    include: { categoria: true },
    orderBy: [{ categoria: { orden: 'asc' } }, { horaInicio: 'asc' }],
  });
}

export default async function HorariosPage() {
  const horarios = await getHorarios();

  const porCategoria = horarios.reduce<Record<string, HorarioListItem[]>>((acc, horario) => {
    const categoria = horario.categoria?.nombre || 'Sin categoría';
    acc[categoria] ??= [];
    acc[categoria].push(horario);
    return acc;
  }, {});

  Object.values(porCategoria).forEach((items) => {
    items.sort((a, b) => {
      const diff = diasOrden.indexOf(a.dia) - diasOrden.indexOf(b.dia);
      return diff !== 0 ? diff : a.horaInicio.localeCompare(b.horaInicio);
    });
  });

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-black py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,197,24,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="eyebrow">Planificación</p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Horarios con orden,
            <span className="block text-[var(--red-600)]">claridad y ritmo de academia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">
            Organizamos cada categoría con una estructura clara para que entrenar se sienta profesional,
            predecible y bien ejecutado.
          </p>
        </div>
      </section>

      <section className="premium-shell py-24">
        <div className="container mx-auto px-4">
          {Object.keys(porCategoria).length === 0 ? (
            <p className="text-center text-gray-600">No hay horarios disponibles aún.</p>
          ) : (
            <div className="space-y-10">
              {Object.entries(porCategoria).map(([categoria, items]) => (
                <section key={categoria} className="card overflow-hidden">
                  <div className="flex flex-col gap-4 border-b border-white/10 bg-[linear-gradient(135deg,#050505,#181818)] px-8 py-8 text-white md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--red-600)]">Categoría</p>
                      <h2 className="mt-3 text-4xl font-black tracking-tight">{categoria}</h2>
                    </div>
                    <div className="rounded-full border border-[color:rgba(196,23,48,0.25)] bg-[color:rgba(196,23,48,0.12)] px-4 py-2 text-sm font-bold text-[var(--red-600)]">
                      {items.length} sesiones registradas
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 md:p-8">
                    {items.map((horario) => (
                      <div
                        key={horario.id}
                        className="grid gap-4 rounded-3xl border border-black/7 bg-white px-5 py-5 md:grid-cols-[1.1fr_1fr_1fr] md:items-center"
                      >
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Día</div>
                          <div className="mt-2 text-2xl font-black tracking-tight text-gray-900">{horario.dia}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Horario</div>
                          <div className="mt-2 text-lg font-black text-gray-900">
                            {horario.horaInicio} - {horario.horaFin}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Sede</div>
                          <div className="mt-2 text-base font-semibold text-gray-700">{horario.sede || '-'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
