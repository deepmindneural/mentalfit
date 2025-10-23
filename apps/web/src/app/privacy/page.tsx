'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Shield, Eye, Lock, FileText } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Logo />
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('privacy.title')}</h1>
          <p className="text-xl text-gray-600">
            Your privacy and data security are our top priorities
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {t('privacy.lastUpdated')}: {t('privacy.effectiveDate')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.introduction.title')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.sections.introduction.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.dataCollection.title')}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">{t('privacy.sections.dataCollection.content')}</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Contact information (name, email address, phone number)</li>
              <li>Employment information (company, job title, department)</li>
              <li>Account credentials and preferences</li>
              <li>Payment and billing information</li>
              <li>Communication records and feedback</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Information</h3>
            <p className="text-gray-700 mb-4">
              As a mental health platform, we may collect Protected Health Information (PHI) including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Mental health assessments and screening results</li>
              <li>Therapy session notes and records</li>
              <li>Treatment plans and progress reports</li>
              <li>Crisis support interactions</li>
              <li>Wellness metrics and self-reported data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage patterns and platform interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.dataUse.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.sections.dataUse.content')}</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide mental health services and support</li>
              <li>Connect you with licensed therapists and professionals</li>
              <li>Monitor and improve your mental health outcomes</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Communicate with you about your account and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Conduct research to improve our services (anonymized data only)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.hipaaCompliance.title')}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <Lock className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Protected Health Information</h3>
                  <p className="text-blue-800">
                    {t('privacy.sections.hipaaCompliance.content')}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Your health information will only be used for treatment, payment, and healthcare operations
              as permitted under HIPAA. We will not sell, rent, or share your PHI with third parties
              without your explicit authorization, except as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.dataSharing.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.sections.dataSharing.content')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">With Your Consent</h3>
            <p className="text-gray-700 mb-4">
              We will share your information with third parties only when you have given us explicit consent to do so.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We may share information with trusted service providers who assist us in operating our platform,
              subject to strict confidentiality agreements.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
            <p className="text-gray-700 mb-4">
              We may disclose information when required by law, court order, or to protect the safety of
              individuals or the public.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Situations</h3>
            <p className="text-gray-700">
              In cases of imminent danger to yourself or others, we may share necessary information with
              emergency services or designated emergency contacts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.dataSecurity.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.sections.dataSecurity.content')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Safeguards</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Encrypted data storage with AES-256</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Administrative Safeguards</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>Role-based access controls</li>
                  <li>Regular staff training on privacy practices</li>
                  <li>Incident response procedures</li>
                  <li>Business associate agreements</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.userRights.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.sections.userRights.content')}</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal information and health records</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Restrict or object to certain uses of your information</li>
              <li>Receive a copy of your information in a portable format</li>
              <li>File a complaint about our privacy practices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.dataRetention.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.sections.dataRetention.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children under 18. If we become aware that we have
              collected such information, we will take steps to delete it promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.changes.title')}</h2>
            <p className="text-gray-700">
              {t('privacy.sections.changes.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.sections.contact.title')}</h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.sections.contact.content')}
            </p>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Privacy Officer</h3>
              <div className="text-gray-700 space-y-1">
                <p>{t('privacy.contact')}</p>
                <p>Phone: 1-800-MENTAL-FIT</p>
                <p>Address: 123 Wellness Ave, Suite 456, San Francisco, CA 94105</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
