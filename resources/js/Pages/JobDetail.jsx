import DOMPurify from "dompurify";
import AppLayout from "../layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import ShareButton from "../components/ShareButton";

export default function JobDetail() {
  const { job } = usePage().props;

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

                  <button className="px-5 py-2 rounded-lg text-sm bg-teal-600 text-white hover:bg-teal-700">
                    Apply Now
                  </button>

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
                  href="#"
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
