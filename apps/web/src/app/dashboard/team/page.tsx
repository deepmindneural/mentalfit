'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Download,
  Upload
} from 'lucide-react';

// Mock team members data
const mockTeamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    joinDate: '2022-03-15',
    status: 'active',
    wellnessScore: 78,
    lastSession: '2024-07-29T14:00:00',
    totalSessions: 12,
    riskLevel: 'low',
    manager: 'Jane Smith',
    avatar: null,
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    joinDate: '2021-08-22',
    status: 'active',
    wellnessScore: 65,
    lastSession: '2024-07-25T10:30:00',
    totalSessions: 18,
    riskLevel: 'medium',
    manager: 'Michael Brown',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@company.com',
    department: 'Sales',
    role: 'Sales Representative',
    joinDate: '2023-01-10',
    status: 'active',
    wellnessScore: 45,
    lastSession: '2024-07-31T09:00:00',
    totalSessions: 8,
    riskLevel: 'high',
    manager: 'Lisa Davis',
    avatar: null,
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@company.com',
    department: 'HR',
    role: 'HR Specialist',
    joinDate: '2022-11-05',
    status: 'active',
    wellnessScore: 89,
    lastSession: '2024-07-28T16:00:00',
    totalSessions: 24,
    riskLevel: 'low',
    manager: 'Robert Wilson',
    avatar: null,
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david@company.com',
    department: 'Engineering',
    role: 'Junior Developer',
    joinDate: '2023-06-01',
    status: 'inactive',
    wellnessScore: 55,
    lastSession: '2024-07-15T11:00:00',
    totalSessions: 3,
    riskLevel: 'medium',
    manager: 'Jane Smith',
    avatar: null,
  },
];

const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
const riskLevels = ['All', 'Low', 'Medium', 'High'];
const statuses = ['All', 'Active', 'Inactive'];

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    const matchesRiskLevel = selectedRiskLevel === 'All' || member.riskLevel.toLowerCase() === selectedRiskLevel.toLowerCase();
    const matchesStatus = selectedStatus === 'All' || member.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesDepartment && matchesRiskLevel && matchesStatus;
  });

  const getWellnessScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'text-green-700 bg-green-100';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'high':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-700 bg-green-100' 
      : 'text-gray-700 bg-gray-100';
  };

  // Calculate team statistics
  const teamStats = {
    totalMembers: mockTeamMembers.length,
    activeMembers: mockTeamMembers.filter(m => m.status === 'active').length,
    avgWellnessScore: Math.round(mockTeamMembers.reduce((sum, m) => sum + m.wellnessScore, 0) / mockTeamMembers.length),
    highRiskMembers: mockTeamMembers.filter(m => m.riskLevel === 'high').length,
  };

  return (
    <DashboardLayout title="Team Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage your team's mental health wellbeing</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="btn-secondary">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </button>
          </div>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.totalMembers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.activeMembers}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {Math.round((teamStats.activeMembers / teamStats.totalMembers) * 100)}% active
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Wellness Score</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.avgWellnessScore}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.2 from last month
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamStats.highRiskMembers}</p>
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Needs attention
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>

            {/* Department Filter */}
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-field"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department{dept !== 'All' ? '' : ''}</option>
              ))}
            </select>

            {/* Risk Level Filter */}
            <select 
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="input-field"
            >
              {riskLevels.map(level => (
                <option key={level} value={level}>{level} Risk{level !== 'All' ? '' : ''}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}{status !== 'All' ? ' Members' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wellness Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                          <div className="text-xs text-gray-400">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.department}</div>
                      <div className="text-xs text-gray-500">Reports to {member.manager}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{member.wellnessScore}</div>
                        <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getWellnessScoreColor(member.wellnessScore)}`}>
                          {member.wellnessScore >= 75 ? 'Good' : member.wellnessScore >= 50 ? 'Fair' : 'Poor'}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className={`h-1.5 rounded-full ${
                            member.wellnessScore >= 75 ? 'bg-green-500' : 
                            member.wellnessScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${member.wellnessScore}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskLevelColor(member.riskLevel)}`}>
                        {member.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(member.lastSession).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {member.totalSessions} total sessions
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-secondary-600 hover:text-secondary-700">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredMembers.length} of {mockTeamMembers.length} members
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Team Member</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input type="text" className="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input type="email" className="input-field" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select className="input-field">
                  <option value="">Select Department</option>
                  {departments.filter(d => d !== 'All').map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input type="text" className="input-field" placeholder="Software Engineer" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="btn-primary"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}