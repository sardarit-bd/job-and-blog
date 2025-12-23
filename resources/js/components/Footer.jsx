export default function Footer() {
    return (
        <footer className="bg-[#373839] py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                
                <div>
                    <h4 className="text-xl font-bold mb-4 text-gray-200">
                    Job Board
                    </h4>
                    <p className="text-sm text-gray-300">
                    Connecting nurses with top healthcare providers.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-3 text-gray-200">For Applicants</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                        <a href="/register" className="hover:text-[#F8721B] transition-colors">Registration</a>
                    </li>
                    <li>
                        <a href="/login" className="hover:text-[#F8721B] transition-colors">Login</a>
                    </li>
                    </ul>
                </div>

                {/* <div>
                    <h4 className="font-bold mb-3 text-gray-200">For Employers</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                    <li>
                        <a href="/recruiter" className="hover:text-[#F8721B] transition-colors">Post a Job</a>
                    </li>
                    <li>
                        <a href="/recruiter/login" className="hover:text-[#F8721B] transition-colors">Employer Login</a>
                    </li>
                    </ul>
                </div> */}

                <div>
                    <h4 className="font-bold mb-3 text-gray-200">Contact Us</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                    47 W 13th St, New York,
                    NY 10011, USA
                    </p>
                </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-600 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Job Board, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}