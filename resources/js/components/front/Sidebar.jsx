import React from "react";
import { LayoutDashboard, X, BriefcaseBusiness } from "lucide-react";

const Sidebar = ({ toggleSidebar }) => {
  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Jobs",
      icon: BriefcaseBusiness,
      path: "/",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-700 text-white shadow-xl">
      
      {/* Logo + Close (mobile) */}
      <div className="flex items-center justify-between p-4 bg-slate-800">
        <h1 className="text-2xl font-bold text-gray-50">Job Board</h1>

        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.path}
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-lg
                transition-colors duration-200
                ${
                  item.name === "Dashboard"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
