// import { useState } from "react";
// import { Link } from "@inertiajs/react";

// export default function Header({ auth }) {
//     const [open, setOpen] = useState(false);

//     return (
//         <header className="bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16">
//                     {/* Logo */}
//                     <Link href="/" className="text-2xl font-bold text-gray-950">
//                         Job Board
//                     </Link>

//                     {/* Desktop Nav */}
//                     <nav className="hidden md:flex space-x-8 items-center">
//                         <a 
//                             href="#jobs" 
//                             className="text-gray-950 dark:text-gray-50 hover:text-primary font-medium"
//                         >
//                             Jobs
//                         </a>
//                         <a href="/recruiter" className="text-gray-950 dark:text-gray-50 hover:text-primary font-medium">
//                             Employers
//                         </a>
//                     </nav>

//                     {/* Right actions */}
//                     <div className="flex items-center space-x-4">
//                         {/* Conditional Login/Dashboard Button */}
//                         <Link
//                             href={auth?.user ? "/dashboard" : "/login"}
//                             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm md:text-base hover:bg-blue-800 transition"
//                         >
//                             {auth?.user ? "Dashboard" : "Login"}
//                         </Link>

//                         {/* Mobile toggle */}
//                         <button
//                             onClick={() => setOpen(!open)}
//                             className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-primary"
//                             aria-label="Toggle menu"
//                         >
//                             <svg
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16m-7 6h7"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {open && (
//                 <div className="md:hidden bg-white shadow-xl py-6 border-t border-gray-200">
//                     <div className="flex flex-col space-y-4 text-center">
//                         <a 
//                             href="#jobs" 
//                             onClick={() => setOpen(false)}
//                             className="text-lg text-gray-950 dark:text-gray-50 font-medium"
//                         >
//                             Jobs
//                         </a>
//                         <a href="/recruiter" className="text-lg text-gray-950 dark:text-gray-50 font-medium">
//                             Employers
//                         </a>
//                         {/* Mobile Login/Dashboard link */}
//                         <Link 
//                             href={auth?.user ? "/dashboard" : "/login"} 
//                             className="text-lg text-blue-700 font-bold"
//                         >
//                             {auth?.user ? "Go to Dashboard" : "Login"}
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// }

import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Header({ auth }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-[60] w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:rotate-6 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-['Poppins']">
                            JOB<span className="text-indigo-600"> Board</span>
                        </span>
                    </Link>

                    {/* Desktop Nav: Center */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {[
                            { name: "Browse Jobs", href: "/#jobs" },
                            { name: "For Employers", href: "/recruiter" },
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side: Auth Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={auth?.user ? "/dashboard" : "/login"}
                            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-sm
                                ${auth?.user 
                                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700" 
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20"
                                }`}
                        >
                            {auth?.user ? "Dashboard" : "Login"}
                        </Link>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950
                ${open ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col space-y-2 px-4">
                    <a href="#jobs" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-900">
                        Browse Jobs
                    </a>
                    <a href="/recruiter" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-900">
                        For Employers
                    </a>
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                        <Link 
                            href={auth?.user ? "/dashboard" : "/login"} 
                            className="flex justify-center w-full py-4 rounded-2xl bg-indigo-600 text-white font-black shadow-lg shadow-indigo-500/30"
                        >
                            {auth?.user ? "Go to Dashboard" : "Get Started"}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}