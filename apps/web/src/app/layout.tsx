import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
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
  title: 'MentalFit - Corporate Mental Health Platform',
  description: 'Professional mental health services for modern workplaces. Connect your team with licensed therapists and wellness resources.',
  keywords: 'mental health, corporate wellness, therapy, employee wellbeing, professional counseling',
  authors: [{ name: 'MentalFit Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MentalFit - Corporate Mental Health Platform',
    description: 'Professional mental health services for modern workplaces',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MentalFit - Corporate Mental Health Platform',
    description: 'Professional mental health services for modern workplaces',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#22c55e" />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <div id="root">
          {children}
        </div>
        
        {/* Toast notifications container */}
        <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2" />
        
        {/* Modal container */}
        <div id="modal-container" />
      </body>
    </html>
  );
}