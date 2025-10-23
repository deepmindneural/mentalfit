'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Users,
  Settings,
  CreditCard
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function ContactPage() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactOptions = [
    {
      icon: MessageCircle,
      title: t('contact.options.generalSupport.title'),
      description: t('contact.options.generalSupport.description'),
      email: 'support@mentalfit.com',
      phone: '1-800-MENTAL-FIT',
      hours: t('contact.options.generalSupport.hours')
    },
    {
      icon: AlertTriangle,
      title: t('contact.options.crisisSupport.title'),
      description: t('contact.options.crisisSupport.description'),
      email: 'crisis@mentalfit.com',
      phone: '1-800-CRISIS-NOW',
      hours: t('contact.options.crisisSupport.hours')
    },
    {
      icon: CreditCard,
      title: t('contact.options.billing.title'),
      description: t('contact.options.billing.description'),
      email: 'billing@mentalfit.com',
      phone: '1-800-BILLING-1',
      hours: t('contact.options.billing.hours')
    },
    {
      icon: Users,
      title: t('contact.options.sales.title'),
      description: t('contact.options.sales.description'),
      email: 'sales@mentalfit.com',
      phone: '1-800-SALES-MF',
      hours: t('contact.options.sales.hours')
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I get started?',
      answer: 'Most organizations can be up and running within 24-48 hours. We provide full onboarding support to ensure a smooth transition.'
    },
    {
      question: 'What if I need immediate crisis support?',
      answer: 'Our crisis support team is available 24/7. Call 1-800-CRISIS-NOW or use the emergency button in your dashboard for immediate assistance.'
    },
    {
      question: 'Do you integrate with existing HR systems?',
      answer: 'Yes, we integrate with most major HR platforms including Workday, BambooHR, and ADP. Contact our technical team for specific integration requirements.'
    },
    {
      question: 'What security measures do you have in place?',
      answer: 'We are HIPAA compliant with end-to-end encryption, SOC 2 certification, and regular security audits. Your data is always protected.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <Link href="/auth/register" className="w-full btn-primary">
                {t('nav.getStarted')}
              </Link>
              <Link href="/" className="w-full btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                {t('nav.demo')}
              </Link>
              <Link href="/contact" className="text-primary-600 font-medium">
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

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${option.email}`} className="hover:text-primary-600">
                      {option.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${option.phone}`} className="hover:text-primary-600">
                      {option.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {option.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.form.title')}</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Acme Corp"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="general">General Questions</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press/Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Need immediate crisis support?</strong> Call 1-800-CRISIS-NOW or contact
                  emergency services if you're experiencing a mental health emergency.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t('contact.form.sending')}
                  </div>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              We'd love to meet you in person
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">San Francisco Headquarters</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Wellness Avenue, Suite 456<br />San Francisco, CA 94105</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST<br />Weekend: Emergency support only</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">1-800-MENTAL-FIT<br />(1-800-636-8253)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-800">
                    <strong>Visiting us?</strong> Please schedule an appointment in advance.
                    We're located in the heart of SOMA with easy access to public transportation.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map would be displayed here</p>
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
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
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
