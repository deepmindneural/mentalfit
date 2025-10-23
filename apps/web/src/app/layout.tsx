import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MentalFit - Tu Bienestar Mental Importa',
  description: 'Plataforma integral de salud mental para empresas modernas. Conecta tu equipo con psicólogos certificados y recursos de bienestar.',
  keywords: 'salud mental, bienestar corporativo, terapia online, psicología, bienestar emocional, terapia empresarial',
  authors: [{ name: 'MentalFit Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MentalFit - Tu Bienestar Mental Importa',
    description: 'Cuida la salud mental de tu equipo con profesionales certificados',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MentalFit - Tu Bienestar Mental Importa',
    description: 'Cuida la salud mental de tu equipo con profesionales certificados',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale || 'es'} className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#a855f7" />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          <div id="root">
            {children}
          </div>

          {/* Toast notifications container */}
          <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2" />

          {/* Modal container */}
          <div id="modal-container" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}