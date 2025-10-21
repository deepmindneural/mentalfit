'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowRight,
  Play,
  Monitor,
  Smartphone,
  Heart,
  Brain,
  Shield,
  Star,
  Video,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

const demoFeatures = [
  {
    icon: Video,
    title: 'Live Therapy Sessions',
    description: 'See how easy it is to connect with licensed therapists'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Explore comprehensive mental health metrics and insights'
  },
  {
    icon: MessageSquare,
    title: 'Crisis Support',
    description: 'Experience our 24/7 emergency support system'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Learn how to monitor and support your team\'s wellbeing'
  }
];

const timeSlots = [
  '9:00 AM - 9:30 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '2:00 PM - 2:30 PM',
  '3:00 PM - 3:30 PM',
  '4:00 PM - 4:30 PM'
];

export default function DemoPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    companySize: '',
    phone: '',
    interests: [] as string[],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate next 7 days for date selection
  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Scheduled!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for scheduling a demo. We've sent you a calendar invitation and will contact you shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Your Demo Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>📅 {selectedDate}</div>
                <div>🕐 {selectedTime}</div>
                <div>📧 {formData.email}</div>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/auth/register" className="w-full btn-primary">
                Get Started Now
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
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/demo" className="text-primary-600 font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Hero */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                See MentalFit in Action
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Schedule a personalized demo to discover how MentalFit can transform 
                your workplace mental health program.
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  30 minutes
                </div>
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  Video call
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Personalized
                </div>
              </div>
            </div>

            {/* What You'll See */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll See</h2>
              <div className="space-y-4">
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Companies Choose MentalFit</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">40% reduction in employee burnout</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">25% improvement in productivity</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">HIPAA compliant & secure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 crisis support</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4">
                "The demo showed us exactly how MentalFit would integrate with our existing systems. 
                The ROI was immediately clear, and implementation was seamless."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">HR Director, TechCorp</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Demo Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 h-fit">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Demo</h2>
              <p className="text-gray-600">Choose a time that works for you</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="john@company.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="HR Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size *
                </label>
                <select
                  name="companySize"
                  required
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
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

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Date *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {getNextSevenDays().map((date, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDate(date.toLocaleDateString())}
                      className={`p-3 text-sm border rounded-lg transition-colors ${
                        selectedDate === date.toLocaleDateString()
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Time *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm border rounded-lg transition-colors ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Areas of Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Areas of Interest (Optional)
                </label>
                <div className="space-y-2">
                  {[
                    'Employee Wellness Programs',
                    'Crisis Support & Intervention',
                    'Analytics & Reporting',
                    'Integration with HR Systems',
                    'Custom Implementation'
                  ].map((interest, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || !formData.firstName || !formData.lastName || !formData.email || !formData.company}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                By scheduling a demo, you agree to our{' '}
                <Link href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}