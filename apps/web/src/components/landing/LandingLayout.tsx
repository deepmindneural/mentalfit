'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { Menu, X } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/para-empresas" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {t('nav.forBusinesses')}
              </Link>
              <Link href="/para-empleados" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {t('nav.forEmployees')}
              </Link>
              <Link href="/caracteristicas/chat-ia" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {t('nav.features')}
              </Link>
              <Link href="/precios" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link href="/sobre-nosotros" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {t('nav.about')}
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('nav.signIn')}
              </Link>
              <Link
                href="/prueba-gratis"
                className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-glow"
              >
                {t('nav.getStarted')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <Link href="/para-empresas" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.forBusinesses')}
                </Link>
                <Link href="/para-empleados" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.forEmployees')}
                </Link>
                <Link href="/caracteristicas/chat-ia" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.features')}
                </Link>
                <Link href="/precios" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.pricing')}
                </Link>
                <Link href="/sobre-nosotros" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.about')}
                </Link>
                <Link href="/auth/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  {t('nav.signIn')}
                </Link>
                <Link
                  href="/prueba-gratis"
                  className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  {t('nav.getStarted')}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company */}
            <div>
              <Logo variant="white" showText={true} />
              <p className="mt-4 text-gray-400">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.product.title')}</h3>
              <ul className="space-y-2">
                <li><Link href="/caracteristicas/chat-ia" className="text-gray-400 hover:text-white transition-colors">{t('footer.product.aiChat')}</Link></li>
                <li><Link href="/caracteristicas/terapia-online" className="text-gray-400 hover:text-white transition-colors">{t('footer.product.therapy')}</Link></li>
                <li><Link href="/caracteristicas/dashboard-empresarial" className="text-gray-400 hover:text-white transition-colors">{t('footer.product.dashboard')}</Link></li>
                <li><Link href="/precios" className="text-gray-400 hover:text-white transition-colors">{t('footer.product.pricing')}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.company.title')}</h3>
              <ul className="space-y-2">
                <li><Link href="/sobre-nosotros" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.about')}</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.blog')}</Link></li>
                <li><Link href="/carreras" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.careers')}</Link></li>
                <li><Link href="/prensa" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.press')}</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.resources.title')}</h3>
              <ul className="space-y-2">
                <li><Link href="/ayuda" className="text-gray-400 hover:text-white transition-colors">{t('footer.resources.help')}</Link></li>
                <li><Link href="/recursos" className="text-gray-400 hover:text-white transition-colors">{t('footer.resources.library')}</Link></li>
                <li><Link href="/webinars" className="text-gray-400 hover:text-white transition-colors">{t('footer.resources.webinars')}</Link></li>
                <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">{t('footer.resources.contact')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <div className="flex space-x-6">
                <Link href="/politica-privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.legal.privacy')}
                </Link>
                <Link href="/terminos-y-condiciones" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.legal.terms')}
                </Link>
                <Link href="/politica-cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.legal.cookies')}
                </Link>
                <Link href="/seguridad" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('footer.legal.security')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
