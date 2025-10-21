'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, Star, Users, Zap, Shield, Heart } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started with mental health support',
    price: 15,
    billing: 'per employee/month',
    features: [
      'Access to licensed therapists',
      'Individual therapy sessions',
      'Basic wellness resources',
      'Email support',
      'Monthly wellness reports',
      'Mobile app access',
    ],
    limitations: [
      'Up to 50 employees',
      'Standard session scheduling',
      'Basic analytics',
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'gray',
  },
  {
    name: 'Professional',
    description: 'Comprehensive mental health solution for growing companies',
    price: 25,
    billing: 'per employee/month',
    features: [
      'Everything in Starter',
      'Group therapy sessions',
      'Crisis support (24/7)',
      'Custom wellness programs',
      'Advanced analytics',
      'Priority support',
      'Team manager dashboard',
      'Integration with HR systems',
    ],
    limitations: [
      'Up to 500 employees',
      'Advanced session scheduling',
      'Detailed reporting',
    ],
    cta: 'Start Free Trial',
    popular: true,
    color: 'primary',
  },
  {
    name: 'Enterprise',
    description: 'Full-scale solution for large organizations with custom needs',
    price: 'Custom',
    billing: 'contact for pricing',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced security features',
      'On-site training',
      'Custom reporting',
      'SLA guarantees',
      'Multi-location support',
    ],
    limitations: [
      'Unlimited employees',
      'Custom features',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'secondary',
  },
];

const faqs = [
  {
    question: 'What is included in the free trial?',
    answer: 'Our 30-day free trial includes full access to all features in your chosen plan, including therapy sessions, wellness resources, and analytics. No credit card required to start.',
  },
  {
    question: 'How do billing and payments work?',
    answer: 'Billing is monthly and based on the number of active employees. You can add or remove employees at any time, and billing adjusts automatically. We accept all major credit cards and ACH payments.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no setup fees or hidden costs. You only pay the monthly subscription fee based on your plan and number of employees.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we\'ll prorate any differences.',
  },
  {
    question: 'What security measures do you have in place?',
    answer: 'We are HIPAA compliant and use enterprise-grade security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is always protected.',
  },
  {
    question: 'Do you offer implementation support?',
    answer: 'Yes, all plans include onboarding support. Professional and Enterprise plans include dedicated implementation assistance and training for your team.',
  },
];

export default function PricingPage() {
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
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-primary-600 font-medium">
                Pricing
              </Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Demo
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Contact
              </Link>
            </nav>
            
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="text-primary-600"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your organization's needs. All plans include access to licensed 
            therapists, wellness resources, and 24/7 support.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 mb-12">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary-500 mr-2" />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-secondary-500 mr-2" />
              10,000+ Companies
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-primary-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.billing}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <div className="text-gray-600 mt-2">{plan.billing}</div>
                      </>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-8 ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2 inline" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan to find the right fit for your organization
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Licensed Therapists</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Individual Sessions</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Group Sessions</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">24/7 Crisis Support</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Custom Integrations</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Dedicated Account Manager</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of companies already using MentalFit to support their employees' mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-secondary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link href="/demo" className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 font-medium py-3 px-8 rounded-lg transition-colors text-lg">
              Schedule Demo
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
              Empowering workplaces with professional mental health support.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 MentalFit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}