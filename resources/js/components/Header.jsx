import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Header({ auth }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-[60] w-full border-b border-slate-200/60 bg-emerald-50/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">

                    {/* Logo */}
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

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <a
                            href="/#jobs"
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-white rounded-xl hover:bg-[#FB721B] transition-all"
                        >
                            Browse Jobs
                        </a>

                        <a
                            href="/blogs"
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-white rounded-xl hover:bg-[#FB721B] transition-all"
                        >
                            Blogs
                        </a>

                        <a
                            href="/about"
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-white rounded-xl hover:bg-[#FB721B] transition-all"
                        >
                            About Me
                        </a>
                    </nav>

                    {/* Desktop Auth (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-white text-[#F8721B] border border-[#F8721B] hover:bg-[#F8721B] hover:text-white transition-all active:scale-95"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-white text-[#F8721B] border border-[#F8721B] hover:bg-[#F8721B] hover:text-white transition-all active:scale-95"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-white text-[#F8721B] border border-[#F8721B] hover:bg-[#F8721B] hover:text-white transition-all active:scale-95"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200"
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

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-200
                ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col space-y-1 px-4">
                    <a
                        href="/#jobs"
                        onClick={() => setOpen(false)}
                        className="text-center pt-2 rounded-xl font-bold text-slate-600 hover:bg-[#FB721B] hover:text-white"
                    >
                        Browse Jobs
                    </a>

                    {/* Mobile Auth */}
                    <div className="py-2 border-slate-100">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                onClick={() => setOpen(false)}
                                className="flex justify-center w-full px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-white text-[#F8721B] border border-[#F8721B] hover:bg-[#F8721B] hover:text-white transition-all active:scale-95"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="flex justify-center px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-[#F8721B] text-white hover:text-white transition-all active:scale-95"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setOpen(false)}
                                    className="flex justify-center px-5 py-2 rounded-3xl text-sm font-bold shadow-sm bg-white text-[#F8721B] border border-[#F8721B] hover:bg-[#F8721B] hover:text-white transition-all active:scale-95"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}