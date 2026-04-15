'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const IMAGENES = ['/imagenes/fut1.jpg', '/imagenes/fut2.png', '/imagenes/fut3.jpg'];

const STATS = [
  { value: '240+', label: 'Jugadores activos' },
  { value: '10 años', label: 'Formando talento' },
  { value: '12', label: 'Entrenadores especializados' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGENES.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#071122] text-white">
      {IMAGENES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img}
            alt={`Entrenamiento ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,20,0.94)_0%,rgba(8,17,34,0.82)_42%,rgba(16,42,103,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(196,23,48,0.22),transparent_22%),radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.08),transparent_18%)]" />

      <div className="container relative z-10 mx-auto flex min-h-[76vh] items-center py-18">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/70">
            Formación competitiva para niños y jóvenes
          </p>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.05em] text-white md:text-7xl xl:text-[6rem]">
            Talento, disciplina
            <span className="block text-[#d11d38]">y una identidad con carácter</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-[1.15rem]">
            Una academia con presencia fuerte, metodología seria y una imagen inspirada en colores clásicos del
            fútbol chileno: azul profundo, blanco limpio y rojo competitivo.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contacto" className="btn-primary">
              Agendar evaluación
            </Link>
            <Link href="/nosotros" className="btn-secondary">
              Conocer la academia
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[linear-gradient(90deg,rgba(8,12,24,0.88),rgba(16,42,103,0.84))] backdrop-blur-xl">
        <div className="container mx-auto grid gap-6 py-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-end justify-between gap-4 border-b border-white/8 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6 last:border-r-0"
            >
              <div>
                <p className="text-3xl font-black tracking-[-0.04em] text-white">{stat.value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.22em] text-white/56">{stat.label}</p>
              </div>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c41730]/60 to-transparent md:hidden" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
