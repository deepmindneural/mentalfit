'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity
} from 'lucide-react';

// Mock data - replace with real API calls
const mockStats = {
  totalUsers: 847,
  activeUsers: 632,
  totalSessions: 1249,
  completedSessions: 1156,
  averageRating: 4.8,
  monthlyGrowth: 12.5,
};

const mockRecentSessions = [
  {
    id: 1,
    user: 'John Doe',
    professional: 'Dr. Sarah Wilson',
    type: 'Therapy Session',
    date: '2024-07-30T14:00:00',
    status: 'completed',
    duration: 50,
  },
  {
    id: 2,
    user: 'Jane Smith',
    professional: 'Dr. Michael Chen',
    type: 'Wellness Check',
    date: '2024-07-30T15:30:00',
    status: 'scheduled',
    duration: 30,
  },
  {
    id: 3,
    user: 'Bob Johnson',
    professional: 'Dr. Emily Brown',
    type: 'Crisis Support',
    date: '2024-07-30T16:00:00',
    status: 'in_progress',
    duration: 60,
  },
];

const mockAlerts = [
  {
    id: 1,
    type: 'warning',
    message: '3 users have missed their scheduled sessions this week',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'info',
    message: 'Monthly wellness report is ready for review',
    time: '1 day ago',
  },
];

export default function DashboardPage() {
  const [userRole] = useState<'admin' | 'company_admin' | 'user' | 'professional'>('company_admin');
  const [stats, setStats] = useState(mockStats);
  const [recentSessions, setRecentSessions] = useState(mockRecentSessions);
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    // Simulate API call
    // fetchDashboardData();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    trend = 'up' 
  }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    trend?: 'up' | 'down';
  }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'in_progress':
        return 'text-blue-700 bg-blue-100';
      case 'scheduled':
        return 'text-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-primary-100">
                Here's what's happening with your team's mental health today.
              </p>
            </div>
            <div className="hidden md:block">
              <Heart className="h-16 w-16 text-primary-200" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Team Members"
            value={stats.totalUsers}
            change="+12 this month"
            icon={Users}
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            change="94% engagement"
            icon={Activity}
          />
          <StatCard
            title="Sessions This Month"
            value={stats.totalSessions}
            change="+18% from last month"
            icon={Calendar}
          />
          <StatCard
            title="Average Rating"
            value={stats.averageRating}
            change="↑ 0.2 from last month"
            icon={TrendingUp}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sessions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(session.status)}
                    <div>
                      <p className="font-medium text-gray-900">{session.user}</p>
                      <p className="text-sm text-gray-600">with {session.professional}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.date).toLocaleDateString()} • {session.duration} min
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Manage
              </button>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-500">No alerts at this time</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium text-primary-700">Schedule Session</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors">
              <Users className="h-5 w-5 text-secondary-600 mr-2" />
              <span className="font-medium text-secondary-700">Invite Team Members</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors">
              <TrendingUp className="h-5 w-5 text-accent-600 mr-2" />
              <span className="font-medium text-accent-700">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}