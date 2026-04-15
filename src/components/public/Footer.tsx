import BrandLogo from '@/components/public/BrandLogo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071122] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,42,103,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(196,23,48,0.12),transparent_24%)]" />
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <BrandLogo size={58} />
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/58">Identidad deportiva</p>
                <h3 className="text-3xl font-black tracking-tight">
                  Escuela <span className="text-[#d11d38]">Elite</span>
                </h3>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base leading-7 text-white/62">
              Formación competitiva con una estética inspirada en colores clásicos del fútbol chileno:
              azul institucional, blanco limpio y rojo como sello de energía.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">Explorar</h4>
            <ul className="mt-5 space-y-3">
              <li><Link href="/" className="text-white/66 transition hover:text-white">Inicio</Link></li>
              <li><Link href="/nosotros" className="text-white/66 transition hover:text-white">Nosotros</Link></li>
              <li><Link href="/categorias" className="text-white/66 transition hover:text-white">Categorías</Link></li>
              <li><Link href="/horarios" className="text-white/66 transition hover:text-white">Horarios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">Contenido</h4>
            <ul className="mt-5 space-y-3">
              <li><Link href="/galeria" className="text-white/66 transition hover:text-white">Galería</Link></li>
              <li><Link href="/noticias" className="text-white/66 transition hover:text-white">Noticias</Link></li>
              <li><Link href="/contacto" className="text-white/66 transition hover:text-white">Contacto</Link></li>
              <li><Link href="/admin" className="text-white/66 transition hover:text-white">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">Contacto</h4>
            <div className="mt-5 space-y-4 text-white/66">
              <p>Av. Deportes 1234, Santiago</p>
              <p>+56 9 1234 5678</p>
              <p>contacto@escuelafutbol.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Escuela de Fútbol Elite. Todos los derechos reservados.</p>
          <p>Diseño inspirado en una identidad clásica y competitiva.</p>
        </div>
      </div>
    </footer>
  );
}
