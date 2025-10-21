'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  MoreHorizontal
} from 'lucide-react';

const mockSessions = [
  {
    id: 1,
    professional: 'Dr. Sarah Wilson',
    type: 'Therapy Session',
    date: '2024-07-31T14:00:00',
    duration: 50,
    status: 'scheduled',
    sessionType: 'video',
    notes: 'Follow-up on anxiety management techniques',
    meetingUrl: 'https://meet.mentalfit.com/session/1',
  },
  {
    id: 2,
    professional: 'Dr. Michael Chen',
    type: 'Medication Review',
    date: '2024-07-30T15:30:00',
    duration: 30,
    status: 'completed',
    sessionType: 'video',
    notes: 'Discussed medication adjustments and side effects',
    rating: 5,
  },
  {
    id: 3,
    professional: 'Dr. Emily Brown',
    type: 'Crisis Support',
    date: '2024-07-29T16:00:00',
    duration: 60,
    status: 'completed',
    sessionType: 'phone',
    notes: 'Emergency session for acute anxiety episode',
    rating: 4,
  },
  {
    id: 4,
    professional: 'Dr. Sarah Wilson',
    type: 'Wellness Check',
    date: '2024-08-02T10:00:00',
    duration: 30,
    status: 'scheduled',
    sessionType: 'video',
    notes: 'Weekly check-in and progress review',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-700 bg-green-100';
    case 'scheduled':
      return 'text-blue-700 bg-blue-100';
    case 'in_progress':
      return 'text-yellow-700 bg-yellow-100';
    case 'cancelled':
      return 'text-red-700 bg-red-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'scheduled':
      return <Clock className="h-4 w-4" />;
    case 'in_progress':
      return <PlayCircle className="h-4 w-4" />;
    case 'cancelled':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getSessionIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'phone':
      return <Phone className="h-4 w-4" />;
    case 'chat':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Video className="h-4 w-4" />;
  }
};

export default function SessionsPage() {
  const [filter, setFilter] = useState('all');
  
  const filteredSessions = mockSessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const upcomingSessions = mockSessions.filter(s => s.status === 'scheduled');
  const completedSessions = mockSessions.filter(s => s.status === 'completed');

  return (
    <DashboardLayout title="My Sessions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
            <p className="text-gray-600 mt-1">Manage your therapy appointments and history</p>
          </div>
          <button className="mt-4 sm:mt-0 btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Schedule New Session
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Sessions' },
              { key: 'scheduled', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div key={session.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Session Type Icon */}
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getSessionIcon(session.sessionType)}
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {session.type}
                        </h3>
                        <p className="text-gray-600">with {session.professional}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {getStatusIcon(session.status)}
                          <span className="ml-1 capitalize">{session.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Date and Duration */}
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(session.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(session.date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })} ({session.duration} min)
                      </div>
                    </div>

                    {/* Notes */}
                    {session.notes && (
                      <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
                    )}

                    {/* Rating (for completed sessions) */}
                    {session.status === 'completed' && session.rating && (
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600 mr-2">Your rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {session.status === 'scheduled' && (
                    <>
                      {session.meetingUrl && (
                        <button className="btn-primary">
                          <Video className="h-4 w-4 mr-2" />
                          Join Session
                        </button>
                      )}
                      <button className="btn-secondary">
                        Reschedule
                      </button>
                    </>
                  )}
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "You haven't scheduled any sessions yet."
                : `No ${filter} sessions found.`
              }
            </p>
            <button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Your First Session
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}