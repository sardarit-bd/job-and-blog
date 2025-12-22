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
        <div className="bg-[#F2EBE6] dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-2xl shadow-slate-200 dark:shadow-none mb-12 border border-slate-100 dark:border-slate-800 transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Poppins'] tracking-tight">
                        Find Your Perfect Role
                    </h2>
                </div>

                {/* Reset Button */}
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="text-xs px-5 py-2.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all font-bold tracking-wide uppercase"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Main Search Bar Row */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by Keyword (e.g. Nursing)..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
                            aria-label="Search jobs by keyword"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-bold transition-all duration-200 gap-2 whitespace-nowrap
                            ${showAdvanced 
                                ? "bg-[#F8721B] dark:bg-blue-600 text-white shadow-lg" 
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                            }`}
                    >
                        <span className="hidden sm:inline">
                            {showAdvanced ? "Hide Filters" : "Advanced Search"}
                        </span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvanced && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-700/50 animate-in fade-in slide-in-from-top-4 duration-300">
                        {/* Experience Level */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                Experience
                            </label>
                            <select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-[#FB721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select experience</option>
                                {experiences.map((exp) => (
                                    <option key={exp.id} value={exp.title || exp.name}>
                                        {exp.title || exp.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Type */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                Job Type
                            </label>
                            <select
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-[#FB721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select job type</option>
                                {jobTypes.map((type) => (
                                    <option key={type.id} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Schedule Type */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                Schedule
                            </label>
                            <select
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-[#FB721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select schedule</option>
                                {schedules.map((sched) => (
                                    <option key={sched.id} value={sched.name}>
                                        {sched.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Remote Status */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
                                Remote Status
                            </label>
                            <select
                                value={remoteStatus}
                                onChange={(e) => setRemoteStatus(e.target.value)}
                                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-[#FB721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select remote status</option>
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