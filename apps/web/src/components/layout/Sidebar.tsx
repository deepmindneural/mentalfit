'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users2, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  BarChart3, 
  Settings, 
  UserCheck,
  Building2,
  HeadphonesIcon,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface SidebarProps {
  userRole?: 'admin' | 'company_admin' | 'user' | 'professional';
}

const navigationItems = {
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
    { name: 'Professionals', href: '/dashboard/professionals', icon: UserCheck },
    { name: 'Users', href: '/dashboard/users', icon: Users2 },
    { name: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  company_admin: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Team Members', href: '/dashboard/team', icon: Users2 },
    { name: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { name: 'Professionals', href: '/dashboard/professionals', icon: UserCheck },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  user: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Sessions', href: '/dashboard/sessions', icon: Calendar },
    { name: 'Find Professionals', href: '/dashboard/professionals', icon: UserCheck },
    { name: 'Chat Support', href: '/dashboard/chat', icon: MessageSquare },
    { name: 'Wellness Resources', href: '/dashboard/resources', icon: HeadphonesIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
  ],
  professional: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Clients', href: '/dashboard/clients', icon: Users2 },
    { name: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { name: 'Earnings', href: '/dashboard/earnings', icon: CreditCard },
    { name: 'Resources', href: '/dashboard/resources', icon: HeadphonesIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
  ],
};

export default function Sidebar({ userRole = 'user' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  const navigation = navigationItems[userRole] || navigationItems.user;

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Logo showText={!isCollapsed} className={isCollapsed ? 'justify-center' : ''} />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-item group ${
                isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {userRole === 'admin' ? 'A' : userRole === 'company_admin' ? 'CA' : userRole === 'professional' ? 'P' : 'U'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userRole === 'admin' ? 'Administrator' : 
                 userRole === 'company_admin' ? 'Company Admin' :
                 userRole === 'professional' ? 'Professional' : 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userRole.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button className="w-full mt-3 flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </button>
        )}
        
        {isCollapsed && (
          <button 
            className="w-full mt-3 flex justify-center p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}