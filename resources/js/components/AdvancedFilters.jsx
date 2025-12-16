import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function AdvancedFilters({
    experienceLevels = [],
    jobTypes = [],
    scheduleTypes = [],
    remoteStatuses = [],
    autoSearch = false,
}) {
    const [filters, setFilters] = useState({
        experience_level_id: "",
        job_type_id: "",
        schedule_type_id: "",
        remote_status_id: "",
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        router.get("/jobs", filters, {
            preserveState: true,
            replace: true,
        });
    };

    // Optional auto-search
    useEffect(() => {
        if (!autoSearch) return;

        const timeout = setTimeout(() => {
            handleSearch();
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    const selectClass =
        "flex-1 bg-gray-900 border border-gray-700 text-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition";

    return (
        <div className="mt-4 bg-gray-950 border border-gray-800 p-4 rounded-2xl shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <select
                    name="experience_level_id"
                    value={filters.experience_level_id}
                    onChange={handleChange}
                    className={selectClass}
                >
                    <option value="">Experience Level</option>
                    {experienceLevels.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    name="job_type_id"
                    value={filters.job_type_id}
                    onChange={handleChange}
                    className={selectClass}
                >
                    <option value="">Job Type</option>
                    {jobTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    name="schedule_type_id"
                    value={filters.schedule_type_id}
                    onChange={handleChange}
                    className={selectClass}
                >
                    <option value="">Schedule Type</option>
                    {scheduleTypes.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    name="remote_status_id"
                    value={filters.remote_status_id}
                    onChange={handleChange}
                    className={selectClass}
                >
                    <option value="">Remote Status</option>
                    {remoteStatuses.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {!autoSearch && (
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg transition"
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
}
