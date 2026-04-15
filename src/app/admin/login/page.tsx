'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:rgba(196,23,48,0.08)] via-transparent to-transparent" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[color:rgba(196,23,48,0.08)] blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[color:rgba(196,23,48,0.08)] blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--red-600)] bg-[color:rgba(196,23,48,0.12)]">
            <span className="text-4xl">⚽</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Panel de <span className="text-[var(--red-600)]">Administración</span>
          </h1>
          <p className="mt-2 text-gray-400">Escuela de Fútbol Elite</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-xl font-bold text-white">Iniciar sesión</h2>

          {error ? (
            <div className="mb-4 rounded-lg border border-red-500/50 bg-red-900/50 px-4 py-3 text-red-300">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-[var(--red-600)]"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-[var(--red-600)]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--red-600)] py-3 font-bold text-white shadow-lg shadow-[rgba(196,23,48,0.24)] transition hover:bg-[var(--red-700)] disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 transition hover:text-[var(--red-600)]">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
