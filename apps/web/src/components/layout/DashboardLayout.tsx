'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  userRole?: 'admin' | 'company_admin' | 'user' | 'professional';
}

export default function DashboardLayout({ 
  children, 
  title = 'Dashboard', 
  userRole = 'user' 
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar userRole={userRole} />
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar userRole={userRole} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title={title} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}