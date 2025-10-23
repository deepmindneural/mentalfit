'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Heart,
  Users,
  Award,
  Shield,
  ArrowRight,
  Brain,
  Target,
  Zap,
  Globe,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function AboutPage() {
  const t = useTranslations();

  const teamMembers = [
    {
      name: 'Dr. Sarah Martinez',
      role: 'CEO & Co-Founder',
      bio: 'Licensed clinical psychologist with 15+ years of experience in corporate mental health.',
      avatar: null,
      credentials: 'Ph.D. Clinical Psychology, Harvard University'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'Former Google engineer passionate about using technology to improve mental health outcomes.',
      avatar: null,
      credentials: 'M.S. Computer Science, Stanford University'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Chief Clinical Officer',
      bio: 'Board-certified psychiatrist specializing in workplace mental health and crisis intervention.',
      avatar: null,
      credentials: 'M.D. Psychiatry, Johns Hopkins University'
    },
    {
      name: 'David Kim',
      role: 'VP of Product',
      bio: 'Product leader with expertise in healthcare technology and user experience design.',
      avatar: null,
      credentials: 'MBA, Wharton School'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We believe every individual deserves access to compassionate, professional mental health support.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your privacy and confidentiality are paramount. We maintain the highest security standards.'
    },
    {
      icon: Users,
      title: 'Inclusive Approach',
      description: 'Mental health affects everyone. We create inclusive solutions for diverse workplaces.'
    },
    {
      icon: Target,
      title: 'Evidence-Based',
      description: 'All our treatments and interventions are grounded in scientific research and best practices.'
    }
  ];

  const achievements = [
    {
      metric: t('about.stats.companies.number'),
      label: t('about.stats.companies.label'),
      description: 'Organizations trust us with their employees\' mental health'
    },
    {
      metric: t('about.stats.therapists.number'),
      label: t('about.stats.therapists.label'),
      description: 'Employees have received support through our platform'
    },
    {
      metric: t('about.stats.satisfaction.number'),
      label: t('about.stats.satisfaction.label'),
      description: 'Of users report improved mental health outcomes'
    },
    {
      metric: '24/7',
      label: 'Crisis Support',
      description: 'Round-the-clock emergency mental health assistance'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Logo />

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-primary-600 font-medium">
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
                href="/auth/register"
                className="btn-primary"
              >
                {t('nav.getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transforming Workplace
              <span className="text-primary-600"> Mental Health</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{t('about.story.title')}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MentalFit was founded in 2020 when our co-founders, Dr. Sarah Martinez and Michael Chen,
                  witnessed firsthand the mental health crisis affecting workplaces worldwide. As a clinical
                  psychologist and software engineer respectively, they combined their expertise to create
                  a solution that bridges the gap between mental health needs and accessibility.
                </p>
                <p>
                  What started as a simple idea to connect employees with licensed therapists has evolved
                  into a comprehensive platform that serves thousands of companies and has positively
                  impacted over 500,000 lives.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, always keeping our core mission
                  at heart: making mental health support as accessible as possible for everyone in the workplace.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">500K+</div>
                    <div className="text-sm text-gray-600">Lives Impacted</div>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.mission.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>

            <div className="bg-secondary-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about.vision.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('about.vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values.title')}</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.team.title')}</h2>
            <p className="text-xl text-gray-600">
              {t('about.team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 mb-2">{member.bio}</p>
                <p className="text-xs text-gray-500">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-primary-100">
              Measurable results that speak to our commitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{achievement.metric}</div>
                <div className="text-lg font-medium text-primary-100 mb-2">{achievement.label}</div>
                <div className="text-sm text-primary-200">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
            <p className="text-xl text-gray-600">
              Your trust and security are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Full compliance with healthcare privacy and security regulations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SOC 2 Certified</h3>
              <p className="text-gray-600">
                Rigorous security controls and data protection standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Licensed Professionals</h3>
              <p className="text-gray-600">
                All therapists are licensed and regularly credentialed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of companies that have already made mental health a priority
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
              {t('nav.getStarted')}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link href="/demo" className="btn-secondary text-lg px-8 py-3">
              {t('nav.demo')}
            </Link>
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
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
            <p className="text-sm text-gray-500">
              {t('home.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
