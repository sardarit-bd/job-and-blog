import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

export default function JobCard({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`group relative bg-white p-5 sm:p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden
          ${isModalOpen 
            ? "pointer-events-none border-slate-200" 
            : "border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-[#F8721B]/10 hover:border-[#F8721B]"
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
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#F8721B] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
          
          {/* Company Logo Section */}
          <div className="md:col-span-2 w-full flex justify-center">
            <div className="relative p-2 w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={job.image}
                alt={job.company?.name || "Company Logo"}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/80x80/f8721b/ffffff?text=Logo";
                }}
              />
            </div>
          </div>

          {/* Job Info Section */}
          <div className="md:col-span-6 text-center md:text-left space-y-2 w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#F8721B] transition-colors capitalize font-['Poppins']">
              {job.title}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2">
              <span className="font-bold text-slate-700">
                {job.company.name || "Company Name N/A"}
              </span>
              <span className="text-slate-300 hidden sm:block">•</span>
              <span className="text-sm font-medium text-slate-500">
                {Object.keys(job.work_from).join(", ")}
              </span>
            </div>

            {/* Structured Details */}
            <div className="grid grid-cols-1 gap-1.5 pt-2">
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                License:{" "}
                <span className="font-medium text-slate-600">
                  {Object.keys(job.licenses).join(", ")}
                </span>
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Experience:{" "}
                <span className="font-medium text-slate-600">
                  {job.experiences.join(", ")}
                </span>
              </p>
            </div>
          </div>

          {/* Right Action/Meta Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center space-y-4 w-full border-t md:border-t-0 border-slate-100 pt-5 md:pt-0">
            
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              {job.remote_statuses.map((status, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#F2EBE6] text-slate-800 border border-slate-200"
                >
                  {status}
                </span>
              ))}
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Published
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {job.posted_at}
              </p>
            </div>
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