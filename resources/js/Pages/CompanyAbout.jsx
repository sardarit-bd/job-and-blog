// import AppLayout from "../layouts/AppLayout";

// export default function CompanyAbout({ company }) {
//   return (
//     <AppLayout>
//       <div className="font-['Poppins'] bg-gray-50 min-h-screen py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* ================= CARD ================= */}
//           <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            
//             {/* ================= HEADER ================= */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
//               {/* Logo */}
//               <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
//                 <img
//                   src={company.logo}
//                   alt={company.name}
//                   className="w-24 h-24 object-contain rounded-xl border p-2"
//                   onError={(e) =>
//                     (e.currentTarget.src =
//                       "https://placehold.co/96x96/E0F2F1/0D9488?text=Logo")
//                   }
//                 />
//               </div>

//               {/* Company Info */}
//               <div className="flex-1 text-center sm:text-left space-y-2">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
//                   {company.name}
//                 </h1>

//                 <a
//                     href={company.website || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="px-6 py-2 rounded-xl text-sm font-medium border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition shadow-md inline-block"
//                     >
//                     Visit Website
//                 </a>
//               </div>
//             </div>

//             <hr className="my-6" />

//             {/* ================= CONTACT INFO ================= */}
//             <div className="flex my-2">
//                 <p className="text-gray-700 text-sm sm:text-base">
//                   {company.description || "No description available."}
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
//               {/* Email */}
//               <div className="flex flex-col">
//                 <span className="font-bold text-gray-800 mb-1">Email</span>
//                 <a
//                   href={`mailto:${company.email}`}
//                   className="text-gray-900 hover:text-teal-600 transition"
//                 >
//                   {company.email || "Not Provided"}
//                 </a>
//               </div>

//               {/* Address */}
//               <div className="flex flex-col">
//                 <span className="font-bold text-gray-800 mb-1">Address</span>
//                 <p className="text-gray-900">
//                   {company.address || "Not Provided"}
//                 </p>
//               </div>
//             </div>

//             {/* ================= OPTIONAL CTA ================= */}
//             <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">
//               {/* <button className="px-6 py-2 rounded-xl text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition shadow-md">
//                 Contact Company
//               </button> */}

//               {/* <button className="px-6 py-2 rounded-xl text-sm font-medium border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition shadow-md">
                

//               </button> */}
              
//             </div>

//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import AppLayout from "../layouts/AppLayout";

export default function CompanyAbout({ company }) {
  return (
    <AppLayout>
      <div className="font-['Poppins'] bg-slate-50 dark:bg-[#020617] min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Profile Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 sm:p-10 relative overflow-hidden">
            
            {/* Top Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 sm:gap-8">
              {/* Logo Wrapper */}
              <div className="relative group mx-auto md:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative p-3 w-32 h-32 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/128x128/6366f1/ffffff?text=Logo")}
                  />
                </div>
              </div>

              {/* Company Identity */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
                    {company.name}
                  </h1>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs">
                    Verified Healthcare Provider
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href={company.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl text-sm font-bold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-10 border-slate-100 dark:border-slate-800" />

            {/* Content Body */}
            <div className="grid grid-cols-1 gap-10">
              
              {/* About Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                  About the Company
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-['Inter'] text-base sm:text-lg">
                  {company.description || "No description available for this provider yet."}
                </p>
              </section>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Tile */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group transition-colors hover:border-indigo-500/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-indigo-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email</p>
                      <a href={`mailto:${company.email}`} className="text-slate-900 dark:text-slate-100 font-semibold hover:text-indigo-600 transition-colors">
                        {company.email || "Not Provided"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address Tile */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group transition-colors hover:border-indigo-500/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-teal-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Headquarters</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">
                        {company.address || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Section: For Employers (Optional) */}
            {/* <div className="mt-12 p-1 bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-2xl">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Interested in joining our team? <span className="text-indigo-600 dark:text-indigo-400 font-bold">Check out our open roles.</span>
                </p>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}