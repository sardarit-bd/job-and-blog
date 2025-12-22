// import { useState } from "react";
// import JobDetailsModal from "./JobDetailsModal";

// export default function JobCard({ job }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div
//         className="job-card bg-sky-50 p-6 shadow-xl rounded-2xl border border-gray-100 transition duration-300 hover:shadow-2xl hover:border-primary/50 cursor-pointer"
//         onClick={(e) => {
//           if (isModalOpen) return; // prevent multiple opens
//           if (e.target.closest("button")) return; // ignore button clicks
//           setIsModalOpen(true);
//         }}
//       >
//         <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
//           <div className="md:col-span-2 w-full md:w-auto flex justify-center">
//             <img
//               src={job.company.logo}
//               alt={job.company?.name || "Company Logo"}
//               className="w-20 h-20 object-contain rounded-xl border p-1"
//               onError={(e) => {
//                 e.currentTarget.src =
//                   "https://placehold.co/80x80/E0F2F1/0D9488?text=Logo";
//               }}
//             />
//           </div>

//           {/* Job Info */}
//           <div className="md:col-span-6 text-center md:text-left space-y-1 w-full">
//             <a
//               href="#"
//               className="text-xl font-bold text-gray-900 hover:text-primary transition duration-150 block font-['Inter'] capitalize"
//             >
//               {job.title}
//             </a>

//             <p className="text-gray-600 text-sm">
//               <span className="text-black text-md font-semibold">
//                 {job.company.name || "Company Name N/A"}
//               </span>
//             </p>
//             <p className="text-black text-sm font-bold">
//               License:{" "}
//               <span className="font-medium text-teal-600">
//                 {Object.keys(job.licenses).join(", ")}
//               </span>
//             </p>
//             <p className="text-black text-sm font-bold">
//               Experience:{" "}
//               <span className="font-medium text-teal-600">
//                 {job.experiences.join(", ")}
//               </span>
//             </p>
//             <p className="text-black text-sm font-bold">
//               Work From:{" "}
//               <span className="font-medium text-teal-600">
//                 {Object.keys(job.work_from).join(", ")}
//               </span>
//             </p>
//           </div>

//           {/* Right column */}
//           <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center space-y-2 w-full mt-4 md:mt-0">
//             <div className="flex flex-wrap gap-2">
//               {job.remote_statuses.map((status, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white"
//                 >
//                   {status}
//                 </span>
//               ))}
//             </div>

//             <p className="text-sm text-black">
//               <span className="font-['Poppins'] font-semibold">
//                 Published: {job.posted_at}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Job Modal */}
//       <JobDetailsModal
//         job={job}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// }

import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

export default function JobCard({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`group relative bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden
          ${isModalOpen 
            ? "pointer-events-none border-slate-200 dark:border-slate-800" 
            : "border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50"
          }
        `}
        onClick={(e) => {
          if (isModalOpen) return;
          if (e.target.closest("button") || e.target.closest("a")) return;
          setIsModalOpen(true);
        }}
      >
        {/* Hover Accent Glow */}
        {!isModalOpen && (
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600 dark:bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
          
          {/* Company Logo Section */}
          <div className="md:col-span-2 w-full flex justify-center">
            <div className="relative p-2 w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={job.company.logo}
                alt={job.company?.name || "Company Logo"}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/80x80/6366f1/ffffff?text=Logo";
                }}
              />
            </div>
          </div>

          {/* Job Info Section */}
          <div className="md:col-span-6 text-center md:text-left space-y-2 w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors capitalize font-['Poppins']">
              {job.title}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {job.company.name || "Company Name N/A"}
              </span>
              <span className="text-slate-300 dark:text-slate-600 hidden sm:block">•</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {Object.keys(job.work_from).join(", ")}
              </span>
            </div>

            {/* Structured Details */}
            <div className="grid grid-cols-1 gap-1.5 pt-2">
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                License:{" "}
                <span className="font-medium text-teal-600 dark:text-teal-400">
                  {Object.keys(job.licenses).join(", ")}
                </span>
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Experience:{" "}
                <span className="font-medium text-teal-600 dark:text-teal-400">
                  {job.experiences.join(", ")}
                </span>
              </p>
            </div>
          </div>

          {/* Right Action/Meta Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center space-y-4 w-full border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-5 md:pt-0">
            
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              {job.remote_statuses.map((status, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-800"
                >
                  {status}
                </span>
              ))}
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Published
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                {job.posted_at}
              </p>
            </div>

            {/* Responsive Button */}
            {/* <button 
              type="button"
              className="w-full md:w-auto px-6 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              View Details
            </button> */}
          </div>
        </div>
      </div>

      <JobDetailsModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}