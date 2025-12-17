export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-smibold mb-4 text-primary">
                            Job Board
                        </h4>
                        <p className="text-sm text-gray-400">
                            Connecting nurses with top healthcare providers.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">For Nurses</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="/register">Registration</a>
                            </li>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">For Employers</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="/recruiter">Post a Job</a>
                            </li>
                            <li>
                                <a href="/recruiter/login">Employer Login</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Help Center</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                    © 2025 Job Board, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
