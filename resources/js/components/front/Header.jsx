import React from "react";
import { router } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const Header = ({ toggleSidebar, auth }) => {
  const userName = auth?.user?.name
    ? auth.user.name.split("  ")
    : "User";

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <header className="flex items-center justify-between h-16 bg-slate-800 border-b border-gray-200 px-4 sm:px-6 lg:px-8 shadow-sm">
      
      {/* Mobile menu button */}
      {toggleSidebar && (
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
        >
          <span className="text-2xl text-gray-100">☰</span>
        </button>
      )}

      <div className="flex-1" />

      {/* User dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 hover:text-black transition focus:outline-none">
            <img
              className="h-8 w-8 rounded-full object-cover border border-gray-300"
              src={`https://ui-avatars.com/api/?name=${userName}&background=5008C3&color=FFFFFF&bold=true`}
              alt="User Avatar"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-200 hover:text-black">
              {userName}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 bg-gray-600 text-white border border-gray-700 shadow-lg"
        >
          <div className="px-3 py-2 border-b border-gray-500 mb-1">
            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Signed in as</p>
            <p className="text-sm font-medium truncate">{userName}</p>
          </div>

          {/* Profile */}
          <DropdownMenuItem
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-500 rounded-md cursor-pointer"
          >
            <User className="h-4 w-4" />
           <a href="/resume">Profile</a>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-500" />

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-gray-500 rounded-md cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
