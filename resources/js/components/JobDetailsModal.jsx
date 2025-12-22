import DOMPurify from "dompurify";
import { createPortal } from "react-dom";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

export default function JobDetailsModal({ job: initialJob, isOpen, onClose }) {
  const { flash } = usePage().props;
  const [job, setJob] = useState(initialJob);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Fetch applied status
  useEffect(() => {
    if (isOpen && initialJob?.id) {
      setLoadingStatus(true);
      fetch(`/jobs/${initialJob.id}/applied-status`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch status");
          return res.json();
        })
        .then((data) => {
          setJob((prev) => ({ ...prev, already_applied: data.already_applied }));
          setLoadingStatus(false);
        })
        .catch((err) => {
          console.error("Error fetching applied status:", err);
          setLoadingStatus(false);
        });
    }
  }, [isOpen, initialJob?.id]);

  const applyJob = () => {
    router.post(
      `/jobs/${job.id}/apply`,
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setJob((prev) => ({ ...prev, already_applied: true })),
        onError: (errors) => console.error("Apply failed:", errors),
      }
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onMouseDown={onClose}
    >
      <div
        className="relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col animate-in zoom-in-95 duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 sm:px-10 sm:py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex p-2 w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 items-center justify-center">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-full h-full object-contain"
                onError={(e) => (e.currentTarget.src = "https://placehold.co/96x96/6366f1/ffffff?text=Logo")}
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white capitalize font-['Poppins'] leading-tight">
                {job.title}
              </h2>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {job.company.name}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {job.remote_statuses?.map((status, i) => (
                  <span key={i} className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                    {status}
                  </span>
                ))}
              </div>

              {/* Description Section */}
              <section>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                  Job Description
                </h3>
                <div 
                  className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-['Inter']"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description || "") }}
                />
              </section>

              {/* Specialities Section */}
              {job.specialities?.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
                    Specialities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.specialities.map((spec, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Company Info Box */}
              <section className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.company.name}</h3>
                  <a
                    href={`/company/${job.company.id}`}
                    target="_blank"
                    className="px-5 py-2 rounded-xl text-sm font-bold border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-slate-900 transition-all"
                  >
                    View Company Profile
                  </a>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {job.company.description || "No description provided."}
                </p>
              </section>
            </div>

            {/* Right Column: Sidebar Stats & CTA */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-widest text-center border-b border-slate-100 dark:border-slate-700 pb-4">Job Summary</h4>
                
                <div className="space-y-4">
                  {[
                    ["Work From", Object.values(job.work_from || {}).join(", ")],
                    ["License", Object.values(job.licenses || {}).join(", ")],
                    ["Job Type", job.job_types?.join(", ")],
                    ["Schedule", job.schedule],
                    ["Salary Range", job.salary_range],
                  ].map(([label, value], index) => value && (
                    <div key={index} className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  {loadingStatus ? (
                    <div className="w-full py-3.5 bg-slate-100 dark:bg-slate-700 animate-pulse rounded-2xl" />
                  ) : !job.can_apply ? (
                    <div className="w-full py-3.5 text-center px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold uppercase border border-red-100 dark:border-red-800/50">
                      Restricted Access
                    </div>
                  ) : job.already_applied ? (
                    <div className="w-full py-3.5 text-center px-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold uppercase border border-emerald-100 dark:border-emerald-800/50">
                      Already Applied
                    </div>
                  ) : (
                    <button
                      onClick={applyJob}
                      className="w-full py-3 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                      Apply Now
                    </button>
                  )}
                  
                  <div className="flex justify-center pt-2">
                    <ShareButton job={job} />
                  </div>
                </div>
              </div>

              <div className="p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Job posted {job.posted_at}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}