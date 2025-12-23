import DOMPurify from "dompurify";
import { createPortal } from "react-dom";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

export default function JobDetailsModal({ job: initialJob, isOpen, onClose }) {
  const { flash } = usePage().props;
  const [job, setJob] = useState(initialJob);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Sync state when initialJob changes
  useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

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
        className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 sm:px-10 sm:py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex p-2 w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 items-center justify-center">
              <img
                src={job.image}
                alt={job.company.name}
                className="w-full h-full object-contain"
                onError={(e) =>
                  (e.currentTarget.src = "https://placehold.co/96x96/f8721b/ffffff?text=Logo")
                }
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8721B] capitalize font-['Poppins'] leading-tight">
                {job.title}
              </h2>
              <p className="text-sm font-medium text-slate-600">{job.company.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {job.remote_statuses?.map((status, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#F2EBE6] text-slate-800 border border-slate-200"
                  >
                    {status}
                  </span>
                ))}
              </div>

              {/* Description */}
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#F8721B] rounded-full" />
                  Job Description
                </h3>
                <div
                  className="prose max-w-none text-slate-600 leading-relaxed font-['Inter']"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description || "") }}
                />
              </section>

              {/* Specialities */}
              {job.specialities?.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#F8721B] rounded-full" />
                    Specialities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.specialities.map((spec, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#F2EBE6] text-slate-800 border border-slate-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Company Info */}
              <section className="p-6 bg-gray-100 rounded-3xl border border-slate-200/50">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{job.company.name}</h3>
                  <a
                    href={`/company/${job.company.id}`}
                    target="_blank"
                    className="px-5 py-2 rounded-xl text-sm font-bold border border-[#F8721B] text-slate-900 hover:bg-[#F8721B] hover:text-white transition-all"
                  >
                    View Company Profile
                  </a>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {job.company.description || "No description provided."}
                </p>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-[#F2EBE6] rounded-[2rem] border border-slate-200/50 shadow-xl shadow-slate-200/30 space-y-6">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest text-center border-b border-slate-200 pb-4">
                  Job Summary
                </h4>

                <div className="space-y-4">
                  {[
                    ["Physician", job.physician], // ✅ Added physician
                    ["Work From", Object.values(job.work_from || {}).join(", ")],
                    ["License", Object.values(job.licenses || {}).join(", ")],
                    ["Job Type", job.job_types?.join(", ")],
                    ["Schedule", job.schedule],
                    ["Salary Range", job.salary_range],
                  ].map(
                    ([label, value], index) =>
                      value && (
                        <div key={index} className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {label}
                          </p>
                          <p className="text-sm font-semibold text-slate-700 capitalize">{value}</p>
                        </div>
                      )
                  )}
                </div>

                <div className="pt-4 space-y-3">
                  {loadingStatus ? (
                    <div className="w-full py-3.5 bg-slate-100 animate-pulse rounded-2xl" />
                  ) : !job.can_apply ? (
                    <div className="w-full py-3.5 text-center px-4 bg-red-50 text-red-600 font-semibold rounded-2xl text-xs uppercase border border-red-100">
                      You can not apply this job
                    </div>
                  ) : job.already_applied ? (
                    <div className="w-full py-3.5 text-center px-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold uppercase border border-emerald-100">
                      Already Applied
                    </div>
                  ) : (
                    <button
                      onClick={applyJob}
                      className="w-full py-2 bg-[#F8721B] text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
                    >
                      Apply Now
                    </button>
                  )}

                  <div className="flex justify-center pt-2">
                    <ShareButton job={job} />
                  </div>
                </div>
              </div>

              <div className="p-4 border border-dashed border-slate-200 rounded-2xl text-center">
                <p className="text-[11px] text-slate-400 font-medium">Job posted {job.posted_at}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
