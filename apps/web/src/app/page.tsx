'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
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

  const features = [
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security and privacy protection for all sessions and data.',
    },
    {
      icon: Users,
      title: 'Licensed Professionals',
      description: 'Access to verified, licensed therapists and mental health specialists.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock crisis support and emergency mental health resources.',
    },
    {
      icon: Award,
      title: 'Evidence-Based',
      description: 'Proven therapeutic approaches backed by research and clinical evidence.',
    },
  ];

  const benefits = [
    'Reduce employee burnout by up to 40%',
    'Increase productivity and engagement',
    'Lower healthcare costs and absenteeism',
    'Improve employee retention rates',
    'Create a supportive workplace culture',
    'Access to comprehensive wellness resources',
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
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
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
                href="/dashboard"
                className="btn-primary"
              >
                Get Started
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
                  Mental Health
                  <span className="text-primary-600"> Solutions</span>
                  <br />
                  for Modern Workplaces
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Empower your team with professional mental health support, wellness resources, 
                  and tools to thrive in today's demanding work environment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  No Setup Fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  30-Day Trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  HIPAA Compliant
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
                      <h3 className="font-semibold text-gray-900">Professional Support</h3>
                      <p className="text-gray-600">Licensed therapists available</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Team Wellness Score</span>
                      <span className="text-primary-600 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Active Sessions</span>
                      <span className="text-primary-600 font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Employee Satisfaction</span>
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
              Why Choose MentalFit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with human expertise 
              to deliver exceptional mental health support for your organization.
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
                  Transform Your Workplace Culture
                </h2>
                <p className="text-lg text-gray-600">
                  Investing in employee mental health isn't just the right thing to do—it's smart business. 
                  See the measurable impact on your organization.
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
                Start Your Journey
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
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-600">
                      Join hundreds of companies already transforming their workplace culture.
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Starting at</div>
                      <div className="text-2xl font-bold text-gray-900">
                        $15<span className="text-lg font-normal">/employee/month</span>
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
              Empowering workplaces with professional mental health support.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 MentalFit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}