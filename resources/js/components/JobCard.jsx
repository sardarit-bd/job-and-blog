import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";
import ShareButton from "./ShareButton";

export default function JobCard({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="job-card bg-white p-6 shadow-xl rounded-2xl border border-gray-100 transition duration-300 hover:shadow-2xl hover:border-primary/50 cursor-pointer"
        onClick={(e) => {
          if (e.target.closest("button")) return;
          setIsModalOpen(true);
        }}
      >
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-2 w-full md:w-auto flex justify-center">
            <img
              src={job.company.logo}
              alt={job.company?.name || "Company Logo"}
              className="w-20 h-20 object-contain rounded-xl border p-1"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/80x80/E0F2F1/0D9488?text=Logo";
              }}
            />
          </div>

          {/* Job Info */}
          <div className="md:col-span-6 text-center md:text-left space-y-1 w-full">
            <a
              href="#"
              className="text-xl font-bold text-gray-900 hover:text-primary transition duration-150 block font-['Inter'] capitalize"
            >
              {job.title}
            </a>

            <p className="text-gray-600 text-sm">
              <span className="text-black text-md font-semibold">
                {job.company.name || "Company Name N/A"}
              </span>
            </p>
            <p className="text-black text-sm font-bold">
              License:{" "}
              <span className="font-medium text-teal-600">
                {Object.keys(job.licenses).join(", ")}
              </span>
            </p>
            <p className="text-black text-sm font-bold">
              Experience:{" "}
              <span className="font-medium text-teal-600">
                {job.experiences.join(", ")}
              </span>
            </p>
            <p className="text-black text-sm font-bold">
              Work From:{" "}
              <span className="font-medium text-teal-600">
                {Object.keys(job.work_from).join(", ")}
              </span>
            </p>
          </div>

          {/* Right column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center space-y-2 w-full mt-4 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {job.remote_statuses.map((status, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white"
                >
                  {status}
                </span>
              ))}
            </div>

            <p className="text-sm text-black">
              <span className="font-['Poppins'] font-semibold">Published: {job.posted_at}</span>
            </p>
            {/* <button className="px-4 py-2 rounded-xl text-sm font-medium bg-teal-700 text-white transition duration-150 shadow-md w-full md:w-auto">
              Share
            </button> */}
            {/* <ShareButton job={job} /> */}
          </div>
        </div>
      </div>

      {/* Job Modal */}
      <JobDetailsModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
