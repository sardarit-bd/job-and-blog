import React, { useState } from 'react';
import Header from '../components/front/Header';
import Sidebar from '../components/front/Sidebar';

const MainLayout = ({ children, auth }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <div className={`
        flex-shrink-0 
        md:block ${isSidebarOpen ? 'block' : 'hidden'} 
        md:w-64 
        w-full
        fixed inset-y-0 z-40 md:relative 
        transform transition-transform duration-300 ease-in-out
      `}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Header Component - Always Visible */}
        <div className="flex-shrink-0">
          <Header toggleSidebar={toggleSidebar} auth={auth} />
        </div>

        {/* Main Content View (The {children}) */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* 3. Mobile Overlay (Darkens background when sidebar is open) 
      */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;