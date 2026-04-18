import Link from 'next/link';
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

function sortHorarios(items: HorarioListItem[]) {
  return [...items].sort((a, b) => {
    const diff = diasOrden.indexOf(a.dia) - diasOrden.indexOf(b.dia);
    return diff !== 0 ? diff : a.horaInicio.localeCompare(b.horaInicio);
  });
}

function dayInitial(day: string) {
  return day.slice(0, 2).toUpperCase();
}

export default async function HorariosPage() {
  const horarios = sortHorarios(await getHorarios());
  const sedes = Array.from(new Set(horarios.map((horario) => horario.sede).filter(Boolean)));
  const diasActivos = diasOrden.filter((dia) => horarios.some((horario) => horario.dia === dia));

  const porCategoria = horarios.reduce<Record<string, HorarioListItem[]>>((acc, horario) => {
    const categoria = horario.categoria?.nombre || 'Sin categoría';
    acc[categoria] ??= [];
    acc[categoria].push(horario);
    return acc;
  }, {});

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-[#071122] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,23,48,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow">Planificación</p>
              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Horarios claros para entrenar con ritmo
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Revisa días, bloques y sedes por categoría. La estructura semanal ayuda a mantener constancia,
                orden y progresión deportiva.
              </p>
            </div>

            <div className="grid min-w-[18rem] gap-3 rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/48">Sesiones</span>
                <span className="text-3xl font-black">{horarios.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/48">Categorías</span>
                <span className="text-3xl font-black">{Object.keys(porCategoria).length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-shell py-20">
        <div className="container mx-auto px-4">
          {horarios.length === 0 ? (
            <div className="rounded-[2rem] bg-white px-8 py-12 text-center shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <h2 className="text-3xl font-black tracking-tight text-gray-900">No hay horarios disponibles aún</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-gray-600">
                Pronto publicaremos la programación semanal de entrenamientos.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[1.8rem] bg-white px-6 py-6 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-600)]">Días activos</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {diasOrden.map((dia) => {
                      const active = diasActivos.includes(dia);
                      return (
                        <span
                          key={dia}
                          className={`rounded-2xl px-4 py-3 text-sm font-black ${
                            active ? 'bg-[#102a67] text-white' : 'bg-[#eef2f7] text-gray-400'
                          }`}
                        >
                          {dayInitial(dia)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[1.8rem] bg-[#071122] px-6 py-6 text-white shadow-[0_14px_38px_rgba(7,17,34,0.16)]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-500)]">Sedes</p>
                  <div className="mt-4 space-y-3">
                    {(sedes.length ? sedes : ['Por confirmar']).map((sede) => (
                      <div key={sede} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 font-bold">
                        {sede}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                {Object.entries(porCategoria).map(([categoria, items], index) => (
                  <section
                    key={categoria}
                    className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.09)]"
                  >
                    <div className="flex flex-col gap-4 bg-[linear-gradient(135deg,#071122,#102a67)] px-7 py-7 text-white md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--red-500)]">
                          Categoría {String(index + 1).padStart(2, '0')}
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight">{categoria}</h2>
                      </div>
                      <div className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-black">
                        {items.length} sesiones
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="space-y-3">
                        {items.map((horario) => (
                          <div
                            key={horario.id}
                            className="grid gap-4 rounded-[1.2rem] border border-black/7 bg-[#f8fafc] px-5 py-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-[#102a67] shadow-sm">
                                {dayInitial(horario.dia)}
                              </div>
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Día</p>
                                <p className="mt-1 font-black text-gray-900">{horario.dia}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Horario</p>
                              <p className="mt-1 text-lg font-black text-gray-900">
                                {horario.horaInicio} - {horario.horaFin}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Sede</p>
                              <p className="mt-1 font-semibold text-gray-700">{horario.sede || 'Por confirmar'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-[1.6rem] bg-white px-6 py-6 shadow-[0_12px_34px_rgba(15,23,42,0.07)] md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-gray-900">¿Necesitas confirmar disponibilidad?</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Escríbenos y revisamos la categoría, cupos y horario más cómodo para tu familia.
                  </p>
                </div>
                <Link href="/contacto" className="btn-primary">
                  Consultar cupo
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
