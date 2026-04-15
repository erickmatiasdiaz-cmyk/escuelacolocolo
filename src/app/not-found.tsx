import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="text-center text-white">
        <div className="mb-4 text-8xl">⚽</div>
        <h1 className="mb-4 text-6xl font-extrabold">404</h1>
        <p className="mb-8 text-2xl text-gray-300">¡Ups! Página no encontrada</p>
        <p className="mb-8 max-w-md text-gray-400">
          La página que buscas no existe o fue movida. Vuelve al inicio para continuar navegando.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-500"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
