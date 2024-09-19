import type { Metadata } from 'next';
import './globals.css';
import { Spline_Sans } from 'next/font/google';

const splineSans = Spline_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gastos dos senadores brasileiros',
  description:
    'Visualizando os gastos dos senadores brasileiros através de gráficos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-100 text-slate-500 min-h-screen antialiased ${splineSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
