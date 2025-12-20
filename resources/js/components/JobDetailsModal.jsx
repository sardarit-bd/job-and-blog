import DOMPurify from "dompurify";
import ShareButton from "./ShareButton";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function JobDetailsModal({ job: initialJob, isOpen, onClose }) {
  
  if (!isOpen) return null;

  const { flash } = usePage().props;

  const [job, setJob] = useState(initialJob);
  const [loadingStatus, setLoadingStatus] = useState(true);
  console.log(job);

  useEffect(() => {
    if (isOpen && initialJob?.id) {
      setLoadingStatus(true);

      fetch(`/jobs/${initialJob.id}/applied-status`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch status');
          return response.json();
        })
        .then((data) => {
          setJob((prev) => ({ ...prev, already_applied: data.already_applied }));
          setLoadingStatus(false);
        })
        .catch((error) => {
          console.error('Error fetching applied status:', error);
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
        onSuccess: () => {
          setJob((prev) => ({ ...prev, already_applied: true }));
        },
        onError: (errors) => {
          console.error('Apply failed:', errors);
        },
      }
    );
  };

  return (
    <div
      className="font-['Poppins'] fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 min-h-[100dvh]"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl max-h-[calc(100dvh-2rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-12 sm:col-span-3 flex justify-center sm:justify-start">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-24 h-24 object-contain rounded-xl border p-2"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/96x96/E0F2F1/0D9488?text=Logo')}
              />
            </div>
            <div className="col-span-12 sm:col-span-9 space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 font-semibold">{job.company.name} {job.company.id}</span>

                {/* Apply Button */}
                {loadingStatus ? (
                  <span className="text-sm text-gray-500">Checking application status...</span>
                ) : !job.can_apply ? (
                  <span className="px-4 py-1.5 rounded-lg text-sm bg-red-100 text-red-700">
                    You cannot apply for this job
                  </span>
                ) : job.already_applied ? (
                  <span className="px-4 py-1.5 rounded-lg text-sm bg-green-100 text-green-700">
                    You already applied for this job
                  </span>
                ) : (
                  <button
                    onClick={applyJob}
                    className="px-4 py-1.5 rounded-lg text-sm bg-teal-600 text-white hover:bg-teal-700 transition"
                  >
                    Apply
                  </button>
                )}

                <ShareButton job={job} />
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Flash Success Message */}
          {flash?.success && (
            <div className="bg-green-100 text-green-800 p-2 rounded mb-2">
              {flash.success}
            </div>
          )}

          {/* Remote Status */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {job.remote_statuses?.map((status, i) => (
              <span key={i} className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
                {status}
              </span>
            ))}
          </div>

          {/* Job Meta Info */}
          <div className="space-y-3 text-sm">
            {[
              ['Work From', Object.values(job.work_from || {}).join(', ')],
              ['License', Object.values(job.licenses || {}).join(', ')],
              ['Job Type', job.job_types?.join(', ') || 'N/A'],
              ['Schedule', job.schedule || 'N/A'],
              ['Salary Transparency', job.salaray_transparency || 'N/A'],
              ['Salary Range', job.salary_range || 'N/A'],
            ].map(([label, value], index) => (
              <div key={index} className="grid grid-cols-12 gap-4 text-md">
                <div className="col-span-12 sm:col-span-4 text-gray-800 font-bold">{label}</div>
                <div className="col-span-12 sm:col-span-8 text-gray-900">{value}</div>
              </div>
            ))}
          </div>

          {/* Job Description */}
          <div className="mt-8">
            <h3 className="text-md font-bold text-black mb-2">Job Description</h3>
            <p
              className="text-black leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description || '') }}
            />
          </div>

          {/* Specialities */}
          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-4 font-semibold text-gray-700">Specialities</div>
            <div className="col-span-12 sm:col-span-8 flex flex-wrap gap-2">
              {job.specialities?.map((spec, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-200 text-black font-semibold">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <hr className="my-8" />

          {/* Company Info */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-gray-900">{job.company.name}</h3>
              <a
                href={`/company/${job.company.id}`}
                target="_blank"
                className="px-4 py-1.5 rounded-lg text-sm border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
              >
                Company Profile
              </a>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {job.company.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}