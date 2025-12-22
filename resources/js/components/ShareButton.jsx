import { useState } from "react";

export default function ShareButton({ job }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();

    try {
      const url = `${window.location.origin}/job/${job.slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset message after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="px-4 py-1.5 rounded-lg text-sm border border-gray-300 bg-black text-white  transition cursor-pointer"
      >
        Share
      </button>

      {copied && (
        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
          Copied!
        </span>
      )}
    </div>
  );
}
