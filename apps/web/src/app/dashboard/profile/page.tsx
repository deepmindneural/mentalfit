'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  User, 
  Edit3, 
  Calendar, 
  Clock, 
  Star,
  TrendingUp,
  TrendingDown,
  Heart,
  Brain,
  Activity,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Save,
  Camera
} from 'lucide-react';

const mockUserData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'Jane Smith',
    startDate: '2022-03-15',
    bio: 'Passionate software engineer focused on building scalable applications. Interested in mental health and work-life balance.',
  },
  mentalHealthProfile: {
    primaryConcerns: ['Work Stress', 'Anxiety', 'Sleep Issues'],
    preferredSessionType: 'Video Call',
    preferredTime: 'Afternoon',
    therapyGoals: [
      'Improve stress management techniques',
      'Better work-life balance',
      'Develop coping strategies for anxiety',
    ],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
    },
  },
  statistics: {
    totalSessions: 24,
    completedSessions: 22,
    upcomingSessions: 2,
    avgRating: 4.8,
    streakDays: 45,
    totalHours: 20,
    improvementScore: 78,
    lastSession: '2024-07-29T14:00:00',
  },
  recentActivity: [
    {
      type: 'session',
      title: 'Therapy Session with Dr. Sarah Wilson',
      date: '2024-07-29T14:00:00',
      duration: 50,
      rating: 5,
    },
    {
      type: 'assessment',
      title: 'Weekly Wellness Check-in',
      date: '2024-07-26T09:00:00',
      score: 7.2,
    },
    {
      type: 'goal',
      title: 'Completed meditation goal',
      date: '2024-07-25T18:30:00',
      achievement: 'Meditated for 7 days straight',
    },
  ],
  wellnessMetrics: [
    { metric: 'Stress Level', current: 4.2, previous: 6.1, target: 3.0 },
    { metric: 'Sleep Quality', current: 7.8, previous: 6.5, target: 8.0 },
    { metric: 'Mood Score', current: 7.5, previous: 6.8, target: 8.5 },
    { metric: 'Energy Level', current: 6.9, previous: 5.8, target: 7.5 },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUserData.personalInfo);

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEditing(false);
  };

  const getMetricColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and mental health journey</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn-primary mt-4 sm:mt-0"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                {/* Avatar */}
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">{profileData.jobTitle}</p>
                <p className="text-sm text-gray-500">{profileData.department}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {mockUserData.statistics.totalSessions}
                    </div>
                    <div className="text-xs text-gray-500">Total Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600">
                      {mockUserData.statistics.streakDays}
                    </div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    {profileData.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-3" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-3" />
                    Reports to {profileData.manager}
                  </div>
                </div>
              </div>
            </div>

            {/* Wellness Score */}
            <div className="card mt-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {mockUserData.statistics.improvementScore}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Wellness Score</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your overall mental health improvement
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" 
                    style={{ width: `${mockUserData.statistics.improvementScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700">{profileData.bio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 not-prose">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Start Date:</span>
                      <p className="text-gray-900">
                        {new Date(profileData.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Employee ID:</span>
                      <p className="text-gray-900">EMP-2024-001</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mental Health Profile */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mental Health Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Concerns</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockUserData.mentalHealthProfile.primaryConcerns.map((concern, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Therapy Goals</h4>
                  <ul className="space-y-1">
                    {mockUserData.mentalHealthProfile.therapyGoals.map((goal, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Target className="h-3 w-3 mt-1 mr-2 text-primary-500 flex-shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preferences</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Session Type:</span>{' '}
                      {mockUserData.mentalHealthProfile.preferredSessionType}
                    </div>
                    <div>
                      <span className="font-medium">Preferred Time:</span>{' '}
                      {mockUserData.mentalHealthProfile.preferredTime}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Emergency Contact</h4>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">
                      {mockUserData.mentalHealthProfile.emergencyContact.name}
                    </div>
                    <div>{mockUserData.mentalHealthProfile.emergencyContact.relationship}</div>
                    <div>{mockUserData.mentalHealthProfile.emergencyContact.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wellness Metrics */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockUserData.wellnessMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">{metric.metric}</h4>
                      {getTrendIcon(metric.current, metric.previous)}
                    </div>
                    
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.current}
                      </span>
                      <span className="text-sm text-gray-500">/ {metric.target}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.current >= metric.target * 0.9 ? 'bg-green-500' :
                          metric.current >= metric.target * 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Previous: {metric.previous}</span>
                      <span className={getMetricColor(metric.current, metric.target)}>
                        {((metric.current / metric.target) * 100).toFixed(0)}% of target
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {mockUserData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'session' && <Calendar className="h-4 w-4 text-primary-600" />}
                      {activity.type === 'assessment' && <Brain className="h-4 w-4 text-primary-600" />}
                      {activity.type === 'goal' && <Award className="h-4 w-4 text-primary-600" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                      
                      {activity.type === 'session' && activity.rating && (
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-gray-600">Rated {activity.rating}/5</span>
                        </div>
                      )}
                      
                      {activity.type === 'assessment' && activity.score && (
                        <div className="mt-1">
                          <span className="text-xs text-gray-600">Score: {activity.score}/10</span>
                        </div>
                      )}
                      
                      {activity.type === 'goal' && activity.achievement && (
                        <div className="mt-1">
                          <span className="text-xs text-gray-600">{activity.achievement}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}