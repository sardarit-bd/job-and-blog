import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
    filters = {},
    experiences = [],
    jobTypes = [],
    remoteStatuses = [],
    workFroms = [],
    schedules = [],
}) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [keyword, setKeyword] = useState(filters.keyword || "");
    const [experience, setExperience] = useState(filters.experience || "");
    const [jobType, setJobType] = useState(filters.jobType || "");
    const [schedule, setSchedule] = useState(filters.schedule || "");
    const [remoteStatus, setRemoteStatus] = useState(filters.remoteStatus || "");

    const debouncedSearch = useDebouncedCallback((keywordValue) => {
        submitSearch({ keyword: keywordValue });
    }, 500);

    const submitSearch = (updatedParams = {}) => {
        const params = {
            ...(keyword ? { keyword } : {}),
            experience: experience || undefined,
            jobType: jobType || undefined,
            schedule: schedule || undefined,
            remoteStatus: remoteStatus || undefined,
            ...updatedParams,
        };

        router.get('/', params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Auto search on keyword (debounced)
    useEffect(() => {
    if (keyword) {
        debouncedSearch(keyword);
    } else {
        submitSearch({ keyword: undefined });
    }
}, [keyword, debouncedSearch]);

    // Auto search on dropdown changes
    useEffect(() => {
        submitSearch();
    }, [experience, jobType, schedule, remoteStatus]);

    // Reset all filters
    const handleReset = () => {
        setKeyword("");
        setExperience("");
        setJobType("");
        setSchedule("");
        setRemoteStatus("");

        // Immediately reload the page without any query params
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Check if any filter is active
    const hasActiveFilters = keyword || experience || jobType || schedule || remoteStatus;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-12 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-['Poppins']">
                    Find Your Perfect Role
                </h2>

                {/* Reset Button - only show when filters are active */}
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by Keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Search jobs by keyword"
                    />

                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="px-4 py-3 bg-blue-700 text-gray-50 rounded-xl hover:bg-blue-800 hover:text-white transition duration-150 font-medium whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">
                                {showAdvanced ? "Hide Filters" : "Advanced Search"}
                            </span>
                            <svg
                                className={`w-5 h-5 inline sm:ml-2 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 11.414V15.5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4.086l-5.707-5.707A1 1 0 013 6V4z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {showAdvanced && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience Level
                            </label>
                            <select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="" disabled>Select Experience Level</option>
                                {experiences.map((exp) => (
                                    <option key={exp.id} value={exp.title || exp.name}>
                                        {exp.title || exp.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Type
                            </label>
                            <select
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="" disabled>Select Job Type</option>
                                {jobTypes.map((type) => (
                                    <option key={type.id} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Schedule Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Schedule Type
                            </label>
                            <select
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="" disabled>Select Schedule</option>
                                {schedules.map((sched) => (
                                    <option key={sched.id} value={sched.name}>
                                        {sched.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Remote Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remote Status
                            </label>
                            <select
                                value={remoteStatus}
                                onChange={(e) => setRemoteStatus(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="" disabled>Select Remote Status</option>
                                {remoteStatuses.map((status) => (
                                    <option key={status.id} value={status.name}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}