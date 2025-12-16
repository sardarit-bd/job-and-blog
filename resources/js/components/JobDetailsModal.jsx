import DOMPurify from "dompurify";
import ShareButton from "./ShareButton";

export default function JobDetailsModal({ job, isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    /* ================= BACKDROP ================= */
    <div
      className="font-['Poppins'] fixed inset-0 z-50 flex items-center justify-center
                 bg-black/30 backdrop-blur-sm p-4 min-h-[100dvh]"
      onClick={onClose}
    >
      {/* ================= MODAL ================= */}
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl
                   max-h-[calc(100dvh-2rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= CLOSE BUTTON ================= */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50
                     rounded-full p-2 text-gray-500
                     hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ================= CONTENT ================= */}
        <div className="p-6 sm:p-8">
          {/* ================= HEADER ================= */}
          <div className="grid grid-cols-12 gap-4 items-start">
            {/* Logo */}
            <div className="col-span-12 sm:col-span-3 flex justify-center sm:justify-start">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-24 h-24 object-contain rounded-xl border p-2"
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://placehold.co/96x96/E0F2F1/0D9488?text=Logo')
                }
              />
            </div>

            {/* Job Info */}
            <div className="col-span-12 sm:col-span-9 space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {job.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 font-semibold">
                  {job.company.name}
                </span>

                <button className="px-4 py-1.5 rounded-lg text-sm
                                   bg-teal-600 text-white hover:bg-teal-700">
                  Apply
                </button>

                {/* <button className="px-4 py-1.5 rounded-lg text-sm
                                   border border-gray-300 hover:bg-gray-100">
                  Share
                </button> */}
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
                className="px-4 py-1 rounded-full text-sm font-semibold
                           bg-blue-600 text-white"
              >
                {status}
              </span>
            ))}
          </div>

          {/* ================= JOB META INFO ================= */}
          <div className="space-y-3 text-sm">
            {[
              ['Work From', Object.values(job.work_from).join(', ')],
              ['License', Object.values(job.licenses).join(', ')],
              ['Job Type', job.job_types.join(', ')],
              ['Schedule', job.schedule],
              ['Salary Transparency', job.salaray_transparency || 'N/A'],
              ['Salary Range', job.salary_range || 'N/A'],
            ].map(([label, value], index) => (
              <div key={index} className="grid grid-cols-12 gap-4 text-md">
                <div className="col-span-12 sm:col-span-4 text-gray-800 font-bold">
                  {label}
                </div>
                <div className="col-span-12 sm:col-span-8 text-gray-900">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* ================= JOB DESCRIPTION ================= */}
          <div className="mt-8">
            <h3 className="text-md font-bold text-black mb-2">
              Job Description
            </h3>
            <p className="text-black leading-relaxed" dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(job.description),
              }}>
            </p>
          </div>

          {/* ================= SPECIALITIES ================= */}
          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-4 font-semibold text-gray-700">
              Specialities
            </div>
            <div className="col-span-12 sm:col-span-8 flex flex-wrap gap-2">
              {job.specialities.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm
                             bg-gray-200 text-black font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <hr className="my-8" />

          {/* ================= COMPANY INFO ================= */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {job.company.name}
              </h3>

              <a
                href="#"
                className="px-4 py-1.5 rounded-lg text-sm
                           border border-teal-600 text-teal-600
                           hover:bg-teal-600 hover:text-white transition"
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
