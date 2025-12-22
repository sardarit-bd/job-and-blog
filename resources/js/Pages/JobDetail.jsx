import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import AppLayout from "../layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";
import ShareButton from "../components/ShareButton";

export default function JobDetail({ job: initialJob }) {
  const [job, setJob] = useState(initialJob);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    if (initialJob?.id) {
      setLoadingStatus(true);
      fetch(`/jobs/${initialJob.id}/applied-status`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          setJob((prev) => ({ ...prev, already_applied: data.already_applied }));
          setLoadingStatus(false);
        })
        .catch(() => setLoadingStatus(false));
    }
  }, [initialJob?.id]);

  const applyJob = () => {
    router.post(`/jobs/${job.id}/apply`, {}, {
      preserveScroll: true,
      onSuccess: () => setJob((prev) => ({ ...prev, already_applied: true })),
    });
  };

  return (
    <AppLayout>
      <div className="font-['Poppins'] bg-slate-50 dark:bg-[#020617] min-h-screen py-6 sm:py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Main Info */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-2xl blur opacity-20 transition duration-300" />
                    <div className="relative p-3 w-24 h-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-full h-full object-contain"
                        onError={(e) => (e.currentTarget.src = "https://placehold.co/96x96/6366f1/ffffff?text=Logo")}
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-4xl font-black text-[#F8721B] dark:text-white capitalize leading-tight mb-2">
                      {job.title}
                    </h1>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                      <span className="text-black dark:text-indigo-400 font-bold tracking-wide underline underline-offset-4 decoration-indigo-200">
                        {job.company.name}
                      </span>
                      <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
                      {/* <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        Posted {job.created_at || "recently"}
                      </span> */}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {job.remote_statuses.map((status, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#F2EBE6] dark:bg-indigo-900/30 text-black dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                      {status}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#F8721B] rounded-full" />
                    About the Role
                  </h3>
                  <div
                    className="text-slate-600 dark:text-slate-400 leading-relaxed font-['Inter']"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
                  />
                </div>

                {/* Specialities */}
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Required Specialities</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.specialities.map((spec, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#F2EBE6] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-colors">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Section */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#F8721B] dark:text-white">About the Company</h3>
                  <a href={`/company/${job.company.id}`} className="text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline">
                    View Profile
                  </a>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {job.company.description || "No company description available."}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Action Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 space-y-6">
                
                {/* Application Card */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <div className="space-y-4 mb-6">
                    {[
                      ["Work From", Object.values(job.work_from).join(", ")],
                      ["Job Type", job.job_types.join(", ")],
                      ["Schedule", job.schedule],
                      ["Salary", job.salary_range || "Competitive"],
                    ].map(([label, value], idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {loadingStatus ? (
                      <div className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
                    ) : !job.can_apply ? (
                      <div className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-black uppercase text-center rounded-2xl border border-red-100 dark:border-red-900/50">
                        Restricted Access
                      </div>
                    ) : job.already_applied ? (
                      <div className="w-full py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase text-center rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                        Application Sent
                      </div>
                    ) : (
                      <button
                        onClick={applyJob}
                        className="w-full py-2 bg-[#F8721B] dark:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer"
                      >
                        Apply for this Job
                      </button>
                    )}
                    <div className="flex justify-center pt-2">
                        <ShareButton job={job} />
                    </div>
                  </div>
                </div>

                {/* License Badge */}
                <div className="bg-[#F2EBE6] dark:bg-indigo-950/40 p-6 rounded-[2rem] text-black">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">Required License</h4>
                  <p className="font-bold text-lg">{Object.values(job.licenses).join(", ")}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}