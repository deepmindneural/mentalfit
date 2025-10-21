'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Video,
  Calendar,
  Heart,
  Brain,
  Users
} from 'lucide-react';

const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    title: 'Licensed Clinical Psychologist',
    specializations: ['Anxiety', 'Depression', 'Stress Management'],
    rating: 4.9,
    reviews: 127,
    experience: '8 years',
    nextAvailable: '2024-07-31T14:00:00',
    hourlyRate: 120,
    profileImage: null,
    isOnline: true,
    languages: ['English', 'Spanish'],
    approach: ['CBT', 'Mindfulness-based'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    title: 'Psychiatrist',
    specializations: ['ADHD', 'Bipolar Disorder', 'Medication Management'],
    rating: 4.8,
    reviews: 93,
    experience: '12 years',
    nextAvailable: '2024-08-01T09:30:00',
    hourlyRate: 150,
    profileImage: null,
    isOnline: false,
    languages: ['English', 'Mandarin'],
    approach: ['Psychiatric Evaluation', 'Medication Therapy'],
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    title: 'Licensed Therapist',
    specializations: ['Trauma', 'PTSD', 'Relationship Counseling'],
    rating: 4.7,
    reviews: 84,
    experience: '6 years',
    nextAvailable: '2024-07-31T16:30:00',
    hourlyRate: 100,
    profileImage: null,
    isOnline: true,
    languages: ['English'],
    approach: ['EMDR', 'Somatic Therapy'],
  },
];

export default function ProfessionalsPage() {
  return (
    <DashboardLayout title="Find Professionals">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mental Health Professionals</h1>
            <p className="text-gray-600 mt-1">Find the right therapist for your needs</p>
          </div>
          <button className="mt-4 sm:mt-0 btn-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Consultation
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                className="pl-10 input-field"
              />
            </div>

            {/* Specialization Filter */}
            <select className="input-field">
              <option value="">All Specializations</option>
              <option value="anxiety">Anxiety</option>
              <option value="depression">Depression</option>
              <option value="trauma">Trauma & PTSD</option>
              <option value="adhd">ADHD</option>
              <option value="relationships">Relationships</option>
              <option value="stress">Stress Management</option>
            </select>

            {/* Availability Filter */}
            <select className="input-field">
              <option value="">Any Time</option>
              <option value="today">Available Today</option>
              <option value="week">This Week</option>
              <option value="online">Online Now</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockProfessionals.map((professional) => (
            <div key={professional.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary-600" />
                  </div>
                  {professional.isOnline && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {professional.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{professional.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{professional.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({professional.reviews})</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">${professional.hourlyRate}/hr</p>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {professional.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {professional.experience}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {professional.languages.join(', ')}
                    </div>
                  </div>

                  {/* Approach */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <strong>Approach:</strong> {professional.approach.join(', ')}
                    </p>
                  </div>

                  {/* Next Available */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Next Available:</strong>{' '}
                      {new Date(professional.nextAvailable).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 btn-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Video className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="btn-secondary">
            Load More Professionals
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}