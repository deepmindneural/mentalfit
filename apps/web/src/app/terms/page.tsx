'use client';

import Link from 'next/link';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function TermsPage() {
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
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="h-8 w-8 text-secondary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: July 31, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using MentalFit's services, you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to these Terms, you may not use our services. These Terms 
              apply to all users, including employees, administrators, and mental health professionals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-700 mb-4">
              MentalFit provides a comprehensive mental health platform that includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access to licensed mental health professionals</li>
              <li>Individual and group therapy sessions</li>
              <li>Crisis support and intervention services</li>
              <li>Wellness resources and educational materials</li>
              <li>Mental health assessments and analytics</li>
              <li>Administrative tools for organizations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To use our services, you must create an account and provide accurate, complete, and 
              current information. You are responsible for maintaining the confidentiality of your 
              account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligibility</h3>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old to use our services. By using our services, you 
              represent and warrant that you meet this age requirement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
            <p className="text-gray-700">
              You are responsible for all activities that occur under your account. You must notify 
              us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Medical Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Medical Information</h3>
                  <div className="text-yellow-800 space-y-2">
                    <p>
                      MentalFit is not a substitute for professional medical advice, diagnosis, or treatment. 
                      Always seek the advice of qualified healthcare providers with questions about medical conditions.
                    </p>
                    <p>
                      In case of a medical emergency or thoughts of self-harm, contact emergency services 
                      immediately or go to your nearest emergency room.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Professional Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Licensed Professionals</h3>
            <p className="text-gray-700 mb-4">
              All mental health professionals on our platform are licensed and credentialed. However, 
              the therapeutic relationship is between you and the individual professional, not MentalFit.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Treatment Decisions</h3>
            <p className="text-gray-700 mb-4">
              Treatment decisions are made collaboratively between you and your mental health professional. 
              MentalFit does not provide medical advice or make treatment recommendations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Confidentiality</h3>
            <p className="text-gray-700">
              Communications with mental health professionals are confidential and protected by professional 
              privilege, except as required by law or in cases of imminent danger.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Conduct</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the services for any unlawful purpose</li>
              <li>Harass, threaten, or intimidate other users or professionals</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Upload malicious software or spam</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Misrepresent your identity or qualifications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our Privacy Policy, which is incorporated by reference 
              into these Terms, explains how we collect, use, and protect your information.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>HIPAA Compliance:</strong> We are fully compliant with HIPAA regulations and 
                implement appropriate safeguards to protect your health information.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing</h3>
            <p className="text-gray-700 mb-4">
              Subscription fees are billed monthly in advance. You authorize us to charge your designated 
              payment method for all fees incurred.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refunds</h3>
            <p className="text-gray-700 mb-4">
              Refunds are provided in accordance with our refund policy. Generally, fees for services 
              already provided are non-refundable.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Late Payments</h3>
            <p className="text-gray-700">
              Late payments may result in suspension of services. We reserve the right to charge 
              late fees for overdue accounts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              MentalFit and its content, features, and functionality are owned by us and protected by 
              intellectual property laws. You may not copy, modify, or distribute our content without permission.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Content</h3>
            <p className="text-gray-700">
              You retain ownership of content you submit but grant us a license to use it for providing 
              our services. You are responsible for ensuring you have the right to share any content you upload.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MENTALFIT SHALL NOT BE LIABLE FOR:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Actions or omissions of mental health professionals</li>
                <li>Technical failures or service interruptions</li>
                <li>Damages exceeding the fees paid for our services</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">By You</h3>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by contacting us or using the account 
              deletion feature in your settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">By Us</h3>
            <p className="text-gray-700">
              We may terminate or suspend your account for violations of these Terms, non-payment, 
              or other reasons at our discretion with appropriate notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Governing Law</h3>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the State of California, without regard to 
              conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Arbitration</h3>
            <p className="text-gray-700">
              Most disputes can be resolved through our customer support. For formal disputes, 
              we prefer arbitration over litigation, which is faster and less expensive for both parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. We will notify you of material changes 
              by email or through our platform. Continued use of our services after changes 
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-secondary-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Legal Department</h3>
              <div className="text-gray-700 space-y-1">
                <p>Email: legal@mentalfit.com</p>
                <p>Phone: 1-800-MENTAL-FIT</p>
                <p>Address: 123 Wellness Ave, Suite 456, San Francisco, CA 94105</p>
              </div>
            </div>
          </section>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-12">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Thank You</h3>
                <p className="text-green-800">
                  Thank you for taking the time to read our Terms of Service. We're committed to 
                  providing you with excellent mental health services while protecting your rights and privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}