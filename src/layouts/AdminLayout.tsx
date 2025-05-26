import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar para pantallas grandes (md+) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Sidebar para mu00f3viles (solo visible cuando sidebarOpen=true) */}
      <div className="md:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40">
            <Sidebar isMobileOpen={sidebarOpen} onClose={closeSidebar} />
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with toggle button for mobile */}
        <AdminHeader onMenuClick={toggleSidebar} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
