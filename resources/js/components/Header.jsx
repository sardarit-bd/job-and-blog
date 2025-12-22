import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Header({ auth }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-gray-50 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-gray-950">
                        Job Board
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a 
                            href="#jobs" 
                            className="text-gray-950 hover:text-primary font-medium"
                        >
                            Jobs
                        </a>
                        <a href="/recruiter" className="text-gray-950 hover:text-primary font-medium">
                            Employers
                        </a>
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center space-x-4">
                        {/* Conditional Login/Dashboard Button */}
                        <Link
                            href={auth?.user ? "/dashboard" : "/login"}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm md:text-base hover:bg-blue-800 transition"
                        >
                            {auth?.user ? "Dashboard" : "Login"}
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-primary"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-xl py-6 border-t border-gray-200">
                    <div className="flex flex-col space-y-4 text-center">
                        <a 
                            href="#jobs" 
                            onClick={() => setOpen(false)}
                            className="text-lg text-gray-800 font-medium"
                        >
                            Jobs
                        </a>
                        <a href="/recruiter" className="text-lg text-gray-800 font-medium">
                            Employers
                        </a>
                        {/* Mobile Login/Dashboard link */}
                        <Link 
                            href={auth?.user ? "/dashboard" : "/login"} 
                            className="text-lg text-blue-700 font-bold"
                        >
                            {auth?.user ? "Go to Dashboard" : "Login"}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}