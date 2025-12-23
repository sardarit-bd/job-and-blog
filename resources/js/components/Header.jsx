import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Header({ auth }) {
    const [open, setOpen] = useState(false);

    return (

        <header className="sticky top-0 z-[60] w-full border-b border-slate-200/60 bg-emerald-50/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-[#F8721B] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-6 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight font-['Poppins']">
                            JOB<span className="text-[#F8721B]"> Board</span>
                        </span>
                    </Link>

                    {/* Desktop Nav: Center */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {[
                            { name: "Browse Jobs", href: "/#jobs" },
                            // { name: "For Employers", href: "/recruiter" },
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-white rounded-xl hover:bg-[#FB721B] transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side: Auth Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={auth?.user ? "/dashboard" : "/login"}
                            className="px-5 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-sm bg-[#F8721B] text-white shadow-orange-500/20"
                        >
                            {auth?.user ? "Dashboard" : "Login"}
                        </Link>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 transition-colors"
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
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white
                ${open ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col space-y-2 px-4">
                    <a href="#jobs" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-black font-bold hover:bg-[#FB721B] hover:text-white">
                        Browse Jobs
                    </a>
                    {/* <a href="/recruiter" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-[#FB721B] hover:text-white">
                        For Employers
                    </a> */}
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link 
                            href={auth?.user ? "/dashboard" : "/login"} 
                            className="flex justify-center w-full py-4 rounded-2xl bg-[#F8721B] text-white font-black shadow-lg shadow-orange-500/30"
                        >
                            {auth?.user ? "Go to Dashboard" : "Get Started"}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}