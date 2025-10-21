'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  Shield,
  Users,
  Clock,
  Award,
  Brain,
  Heart,
  CheckCircle
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function HomePage() {
  // For now, redirect to dashboard. In production, check auth status
  // useEffect(() => {
  //   redirect('/dashboard');
  // }, []);

  const t = useTranslations();

  const features = [
    {
      icon: Shield,
      title: t('home.features.hipaa.title'),
      description: t('home.features.hipaa.description'),
    },
    {
      icon: Users,
      title: t('home.features.professionals.title'),
      description: t('home.features.professionals.description'),
    },
    {
      icon: Clock,
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
    },
    {
      icon: Award,
      title: t('home.features.evidence.title'),
      description: t('home.features.evidence.description'),
    },
  ];

  const benefits = [
    t('home.benefits.list.burnout'),
    t('home.benefits.list.productivity'),
    t('home.benefits.list.costs'),
    t('home.benefits.list.retention'),
    t('home.benefits.list.culture'),
    t('home.benefits.list.resources'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Logo />
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-primary-600 font-medium">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.demo')}
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {t('nav.signIn')}
              </Link>
              <Link
                href="/dashboard"
                className="btn-primary"
              >
                {t('nav.getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold font-display text-gray-900 leading-tight">
                  {t('home.hero.title')}
                  <span className="text-primary-600">{t('home.hero.titleHighlight')}</span>
                  <br />
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
                >
                  {t('home.hero.cta.trial')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center"
                >
                  {t('home.hero.cta.learnMore')}
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  {t('home.hero.badges.noSetupFees')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  {t('home.hero.badges.trial')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  {t('home.hero.badges.compliant')}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('home.stats.professionalSupport')}</h3>
                      <p className="text-gray-600">{t('home.stats.licensedTherapists')}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{t('home.stats.teamWellness')}</span>
                      <span className="text-primary-600 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{t('home.stats.activeSessions')}</span>
                      <span className="text-primary-600 font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{t('home.stats.satisfaction')}</span>
                      <span className="text-primary-600 font-bold">9.2/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
                  {t('home.benefits.title')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('home.benefits.subtitle')}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard"
                className="btn-primary inline-flex items-center"
              >
                {t('home.benefits.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-primary-600" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {t('home.benefits.card.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('home.benefits.card.subtitle')}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">{t('home.benefits.card.pricing')}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        $15<span className="text-lg font-normal">{t('home.benefits.card.perEmployee')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Logo variant="white" />
            <p className="text-gray-400">
              {t('home.footer.tagline')}
            </p>
            <p className="text-sm text-gray-500">
              {t('home.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}