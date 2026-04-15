import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Escuela de Fútbol Elite',
  description: 'Formando campeones del futuro. Entrenamiento profesional para niños y jóvenes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
