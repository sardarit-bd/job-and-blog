import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import AppLayout from "../layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";
import ShareButton from "../components/ShareButton";

export default function JobDetail({ job: initialJob}) {
  const { flash } = usePage().props;

  const [job, setJob] = useState(initialJob);
  const [loadingStatus, setLoadingStatus] = useState(true);
  
    useEffect(() => {
      if (initialJob?.id) {
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
    }, [initialJob?.id]);

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
    <AppLayout>
      <div className="font-['Poppins'] bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= CARD ================= */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
              {/* Logo */}
              <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-24 h-24 object-contain rounded-xl border p-2"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/96x96/E0F2F1/0D9488?text=Logo")
                  }
                />
              </div>

              {/* Job Info */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                  {job.title}
                </h1>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start items-center gap-3 mt-2">
                  <span className="text-gray-700 font-semibold">
                    {job.company.name}
                  </span>

                  {loadingStatus ? (
                    <span className="text-sm text-gray-500">Checking application status...</span>
                  ) : !job.can_apply ? (
                    /* Cross-check result: User owns this post */
                    <span className="px-4 py-1.5 rounded-lg text-sm bg-red-100 text-red-700 border border-red-200">
                      You cannot apply for this job
                    </span>
                  ) : job.already_applied ? (
                    <span className="px-4 py-1.5 rounded-lg text-sm bg-green-100 text-green-700 font-semibold">
                      You already applied for this job
                    </span>
                  ) : (
                    <button
                      onClick={applyJob}
                      className="px-4 py-1.5 rounded-lg text-sm bg-teal-600 text-white hover:bg-teal-700 transition font-medium"
                    >
                      Apply Now
                    </button>
                  )}

                  <ShareButton job={job} />
                </div>
              </div>
            </div>

            <hr className="my-6" />

            {/* ================= REMOTE STATUS ================= */}
            <div className="flex justify-center flex-wrap gap-2 mb-6">
              {job.remote_statuses.map((status, i) => (
                <span
                  key={i}
                  className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white"
                >
                  {status}
                </span>
              ))}
            </div>

            {/* ================= JOB META INFO ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                ["Work From", Object.values(job.work_from).join(", ")],
                ["License", Object.values(job.licenses).join(", ")],
                ["Job Type", job.job_types.join(", ")],
                ["Schedule", job.schedule],
                ["Salary Transparency", job.salaray_transparency || "N/A"],
                ["Salary Range", job.salary_range || "N/A"],
              ].map(([label, value], index) => (
                <div key={index} className="flex gap-2 sm:gap-4">
                  <div className="w-1/3 font-bold text-gray-800">{label}</div>
                  <div className="w-2/3 text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            {/* ================= JOB DESCRIPTION ================= */}
            <div className="mt-8">
              <h2 className="font-bold text-black mb-3">Job Description</h2>
              <div
                className="text-black leading-relaxed prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.description),
                }}
              />
            </div>

            {/* ================= SPECIALITIES ================= */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 font-bold text-gray-800">Specialities</div>
              <div className="sm:col-span-8 flex flex-wrap gap-2">
                {job.specialities.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-gray-200 text-black font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <hr className="my-8" />

            {/* ================= COMPANY INFO ================= */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {job.company.name}
                </h2>

                <a
                  href={`/company/${job.company.id}`}
                  className="px-4 py-2 rounded-lg text-sm border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                >
                  Company Profile
                </a>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {job.company.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
