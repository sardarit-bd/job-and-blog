import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, X, BriefcaseBusiness, LogOut } from "lucide-react";

const Sidebar = ({ toggleSidebar }) => {
  const { url } = usePage(); 

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Resume",
      icon: BriefcaseBusiness,
      path: "/resume", 
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      
      {/* Brand Logo Section */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-300 bg-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Job<span className="text-indigo-600">Board</span>
          </span>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto bg-gray-100">
        {/* <p className="px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-4">
          Overview
        </p> */}
        
        {navItems.map((item) => {
          const Icon = item.icon;
          
          // Logic: Highlight if exact match OR if current URL starts with this path
          // This prevents "/" from matching everything.
          const isActive = url === item.path || (item.path !== "/dashboard" && url.startsWith(item.path));

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl
                transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon className={`
                mr-3 h-5 w-5 transition-colors
                ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}
              `} />
              <span className="flex-1">{item.name}</span>
              
              {isActive && (
                <div className="w-1 h-4 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / User Action */}
      {/* <div className="p-4 border-t border-gray-300 bg-gray-100">
        <Link 
          href="/logout" 
          method="post" 
          as="button" 
          className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
          Sign Out
        </Link>
      </div> */}
    </div>
  );
};

export default Sidebar;