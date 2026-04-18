import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Colo Colo Santa Bárbara',
  description: 'Escuela de fútbol formativo para niños y jóvenes en Santa Bárbara.',
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
