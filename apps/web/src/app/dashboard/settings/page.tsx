'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Building2, 
  Users, 
  Lock,
  Mail,
  Phone,
  Globe,
  Palette,
  Moon,
  Sun,
  Volume2,
  Eye,
  Save,
  AlertTriangle,
  CheckCircle,
  Key
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'HR Manager',
    department: 'Human Resources',
    bio: 'Passionate about employee wellbeing and mental health advocacy.',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    weeklyReports: true,
    emergencyAlerts: true,
    marketingEmails: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'team', // public, team, private
    shareAnalytics: true,
    shareProgress: false,
    allowDirectContact: true,
  });

  // Company settings (for company admins)
  const [companySettings, setCompanySettings] = useState({
    companyName: 'Acme Corporation',
    industry: 'Technology',
    size: '201-1000',
    address: '123 Business St, City, ST 12345',
    website: 'https://acme.com',
    logo: null,
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setUnsavedChanges(true);
    switch (section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotifications(prev => ({ ...prev, [field]: value }));
        break;
      case 'privacy':
        setPrivacy(prev => ({ ...prev, [field]: value }));
        break;
      case 'company':
        setCompanySettings(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const handleSave = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUnsavedChanges(false);
    // Show success message
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
          {unsavedChanges && (
            <button onClick={handleSave} className="btn-primary mt-4 sm:mt-0">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>

        {unsavedChanges && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <p className="text-sm text-yellow-800">
                You have unsaved changes. Don't forget to save before leaving this page.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                    
                    {/* Avatar */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <button className="btn-secondary text-sm">
                          Change Avatar
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
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
                          onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={profileData.jobTitle}
                          onChange={(e) => handleInputChange('profile', 'jobTitle', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={profileData.department}
                          onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                        className="input-field"
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {key === 'emailNotifications' && 'Receive updates and important information via email'}
                              {key === 'pushNotifications' && 'Get instant notifications on your device'}
                              {key === 'sessionReminders' && 'Reminders before scheduled sessions'}
                              {key === 'weeklyReports' && 'Weekly summary of your mental health progress'}
                              {key === 'emergencyAlerts' && 'Critical alerts for crisis situations'}
                              {key === 'marketingEmails' && 'Promotional content and product updates'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Profile Visibility
                        </label>
                        <div className="space-y-2">
                          {[
                            { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
                            { value: 'team', label: 'Team Only', desc: 'Only your team members can see your profile' },
                            { value: 'private', label: 'Private', desc: 'Only you and administrators can see your profile' },
                          ].map((option) => (
                            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option.value}
                                checked={privacy.profileVisibility === option.value}
                                onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                                className="text-primary-600 focus:ring-primary-500"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {key === 'shareAnalytics' && 'Allow anonymous usage data to improve the platform'}
                              {key === 'shareProgress' && 'Share your progress with your manager (anonymized)'}
                              {key === 'allowDirectContact' && 'Allow mental health professionals to contact you directly'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(value)}
                              onChange={(e) => handleInputChange('privacy', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Change Password */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Change Password</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="input-field"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="input-field"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="input-field"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <button className="btn-primary w-fit">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            Not Enabled
                          </span>
                        </div>
                        <button className="btn-secondary">
                          <Key className="h-4 w-4 mr-2" />
                          Enable 2FA
                        </button>
                      </div>

                      {/* Active Sessions */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Active Sessions</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Current Session</p>
                                <p className="text-xs text-gray-500">Chrome on macOS • San Francisco, CA</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">Active now</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Mobile App</p>
                                <p className="text-xs text-gray-500">iPhone • Last seen 2 hours ago</p>
                              </div>
                            </div>
                            <button className="text-xs text-red-600 hover:text-red-700">
                              Revoke
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === 'company' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={companySettings.companyName}
                          onChange={(e) => handleInputChange('company', 'companyName', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <select
                          value={companySettings.industry}
                          onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                          className="input-field"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Education">Education</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail">Retail</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size
                        </label>
                        <select
                          value={companySettings.size}
                          onChange={(e) => handleInputChange('company', 'size', e.target.value)}
                          className="input-field"
                        >
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={companySettings.address}
                          onChange={(e) => handleInputChange('company', 'address', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          value={companySettings.website}
                          onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                          className="input-field"
                          placeholder="https://company.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h2>
                    
                    {/* Current Plan */}
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Enterprise Plan</h3>
                          <p className="text-gray-600">Unlimited users and advanced features</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">$15,000</div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Active
                        </span>
                        <button className="btn-secondary">
                          Change Plan
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-gray-900 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">****</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">**** **** **** 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="btn-secondary text-sm">
                          Update
                        </button>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Billing History</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="divide-y divide-gray-200">
                          {[
                            { date: '2025-07-01', amount: '$15,000', status: 'Paid' },
                            { date: '2025-06-01', amount: '$15,000', status: 'Paid' },
                            { date: '2025-05-01', amount: '$15,000', status: 'Paid' },
                          ].map((invoice, index) => (
                            <div key={index} className="px-4 py-3 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                                  <p className="text-xs text-gray-500">Enterprise Plan</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900">{invoice.amount}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  {invoice.status}
                                </span>
                                <button className="text-primary-600 hover:text-primary-700 text-sm">
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}