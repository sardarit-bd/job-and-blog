import AppLayout from "../layouts/AppLayout";

export default function CompanyAbout({ company }) {
  return (
    <AppLayout>
      <div className="font-['Poppins'] bg-slate-200 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Profile Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-10 relative overflow-hidden">
            
            {/* Top Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 sm:gap-8">
              {/* Logo Wrapper */}
              <div className="relative group mx-auto md:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#F8721B] to-yellow-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative p-3 w-32 h-32 bg-white rounded-2xl border border-slate-100 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/128x128/f8721b/ffffff?text=Logo")}
                  />
                </div>
              </div>

              {/* Company Identity */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 capitalize tracking-tight">
                    {company.name}
                  </h1>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href={company.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-2 rounded-xl text-sm font-bold bg-[#F8721B] text-white hover:bg-[#e06317] transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-10 border-slate-200/60" />

            {/* Content Body */}
            <div className="grid grid-cols-1 gap-10">
              
              {/* About Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#F8721B] rounded-full" />
                  About the Company
                </h3>
                <p className="text-slate-600 leading-relaxed font-['Inter'] text-base sm:text-lg">
                  {company.description || "No description available for this provider yet."}
                </p>
              </section>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Tile */}
                <div className="p-6 rounded-2xl bg-white/50 border border-slate-200/60 transition-all duration-300 hover:border-2 hover:border-[#F8721B]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-[#F8721B]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                      <a href={`mailto:${company.email}`} className="text-slate-900 font-semibold hover:text-[#F8721B] transition-colors">
                        {company.email || "Not Provided"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address Tile */}
                <div className="p-6 rounded-2xl bg-white/50 border border-slate-200/60 transition-all duration-300 hover:border-2 hover:border-[#F8721B]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-teal-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headquarters</p>
                      <p className="text-slate-900 font-semibold">
                        {company.address || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </div>
    </AppLayout>
  );
}