'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar, 
  Clock, 
  Star,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Heart
} from 'lucide-react';

// Mock data for analytics
const mockAnalytics = {
  overview: {
    totalSessions: 1249,
    totalUsers: 847,
    activeUsers: 632,
    avgRating: 4.8,
    completionRate: 92.5,
    engagementRate: 78.3,
  },
  trends: {
    sessionsGrowth: 15.2,
    usersGrowth: 12.8,
    satisfactionGrowth: 3.1,
    retentionGrowth: -2.4,
  },
  sessionsByType: [
    { type: 'Individual Therapy', count: 687, percentage: 55 },
    { type: 'Group Sessions', count: 312, percentage: 25 },
    { type: 'Crisis Support', count: 156, percentage: 12.5 },
    { type: 'Wellness Coaching', count: 94, percentage: 7.5 },
  ],
  mentalHealthMetrics: [
    { metric: 'Stress Levels', current: 6.2, previous: 7.1, trend: 'down' },
    { metric: 'Anxiety Score', current: 5.8, previous: 6.4, trend: 'down' },
    { metric: 'Depression Index', current: 4.1, previous: 4.9, trend: 'down' },
    { metric: 'Sleep Quality', current: 7.3, previous: 6.8, trend: 'up' },
    { metric: 'Work Satisfaction', current: 7.9, previous: 7.2, trend: 'up' },
  ],
  timeRanges: ['7 days', '30 days', '90 days', '1 year'],
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30 days');
  const [selectedMetric, setSelectedMetric] = useState('sessions');

  const StatCard = ({ 
    title, 
    value, 
    trend, 
    trendValue, 
    icon: Icon, 
    prefix = '', 
    suffix = '' 
  }: {
    title: string;
    value: number | string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: number;
    icon: any;
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{value}{suffix}
          </p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-4 w-4 mr-1" />
              ) : (
                <Activity className="h-4 w-4 mr-1" />
              )}
              {Math.abs(trendValue)}% from last period
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your organization's mental health metrics</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select 
              className="input-field"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {mockAnalytics.timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            <button className="btn-secondary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sessions"
            value={mockAnalytics.overview.totalSessions}
            trend="up"
            trendValue={mockAnalytics.trends.sessionsGrowth}
            icon={Calendar}
          />
          <StatCard
            title="Active Users"
            value={mockAnalytics.overview.activeUsers}
            trend="up"
            trendValue={mockAnalytics.trends.usersGrowth}
            icon={Users}
          />
          <StatCard
            title="Avg Rating"
            value={mockAnalytics.overview.avgRating}
            trend="up"
            trendValue={mockAnalytics.trends.satisfactionGrowth}
            icon={Star}
          />
          <StatCard
            title="Completion Rate"
            value={mockAnalytics.overview.completionRate}
            trend="down"
            trendValue={Math.abs(mockAnalytics.trends.retentionGrowth)}
            suffix="%"
            icon={CheckCircle}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Types */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Session Types</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.sessionsByType.map((session, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${index * 90 + 210}, 70%, 60%)` 
                      }}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {session.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {session.count}
                    </div>
                    <div className="text-xs text-gray-500">
                      {session.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual representation */}
            <div className="mt-6">
              <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                {mockAnalytics.sessionsByType.map((session, index) => (
                  <div
                    key={index}
                    className="h-full"
                    style={{
                      width: `${session.percentage}%`,
                      backgroundColor: `hsl(${index * 90 + 210}, 70%, 60%)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mental Health Metrics */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Mental Health Metrics</h2>
              <Heart className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.mentalHealthMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {metric.metric}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">
                        {metric.current}/10
                      </span>
                      <div className={`flex items-center text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.current - metric.previous).toFixed(1)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.current >= 7 ? 'bg-green-500' : 
                        metric.current >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(metric.current / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Patterns */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Patterns</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Peak Hours</span>
                <span className="text-sm font-medium">2-4 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most Active Day</span>
                <span className="text-sm font-medium">Wednesday</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Session Length</span>
                <span className="text-sm font-medium">47 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">No-show Rate</span>
                <span className="text-sm font-medium text-red-600">7.5%</span>
              </div>
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Indicators</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Medium Risk</p>
                  <p className="text-xs text-yellow-600">12 employees need attention</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">High Risk</p>
                  <p className="text-xs text-red-600">3 employees need immediate support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Improved</p>
                  <p className="text-xs text-green-600">18 employees showing progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals & Targets */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Goals & Targets</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-medium">78.3% / 85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Satisfaction Score</span>
                  <span className="font-medium">4.8 / 4.5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Retention Rate</span>
                  <span className="font-medium">89% / 90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '89%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Positive Trends</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Session completion rates have improved by 15% this month
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Employee stress levels decreased by 12% since program launch
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Work satisfaction scores are at an all-time high
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Areas for Improvement</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  No-show rates slightly increased in the last 2 weeks
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  Group session utilization could be improved
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  Consider expanding crisis support availability
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}