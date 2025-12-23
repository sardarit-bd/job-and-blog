import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
    filters = {},
    industries = [],
    workFroms = [],
    licensedIns = [],
    licensedTypes = [],
    physicians = [],
    alliedHealthOptions = [],
}) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [keyword, setKeyword] = useState(filters.keyword || "");
    const [industry, setIndustry] = useState(filters.industry || "");
    const [workFrom, setWorkFrom] = useState(filters.workFrom || "");
    const [licensedIn, setLicensedIn] = useState(filters.licensedIn || "");
    const [licensedType, setLicensedType] = useState(filters.licensedType || "");
    const [selectedPhysician, setSelectedPhysician] = useState(filters.physician || "");
    const [selectedAlliedHealth, setSelectedAlliedHealth] = useState(filters.allied_health || "");


    const debouncedSearch = useDebouncedCallback((keywordValue) => {
        submitSearch({ keyword: keywordValue });
    }, 500);

    const submitSearch = (updatedParams = {}) => {
        const params = {
            ...(keyword ? { keyword } : {}),
            industry: industry || undefined,
            workFrom: workFrom || undefined,
            licensedIn: licensedIn || undefined,
            licensedType: licensedType || undefined,
            selectedPhysician: selectedPhysician || undefined,
            selectedAlliedHealth: selectedAlliedHealth || undefined,
            ...updatedParams,
        };

        router.get('/', params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (keyword) {
            debouncedSearch(keyword);
        } else {
            submitSearch({ keyword: undefined });
        }
    }, [keyword, debouncedSearch]);

    useEffect(() => {
        submitSearch();
    }, [industry, workFrom, licensedIn, licensedType, selectedPhysician, selectedAlliedHealth]);


    const handleReset = () => {
        setKeyword("");
        setIndustry("");
        setWorkFrom("");
        setLicensedIn("");
        setLicensedType("");
        setSelectedPhysician("");
        setSelectedAlliedHealth(""); 

        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        setLicensedType(filters.licensedType || "");
    }, [filters.licensedType]);


    const hasActiveFilters = keyword || industry || workFrom || licensedIn || licensedType || selectedPhysician || selectedAlliedHealth;

    return (
        <div className="bg-[#F2EBE6] backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-2xl shadow-slate-200 mb-12 border border-slate-100 transition-all duration-500">
            {/* Header and Reset Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-['Poppins'] tracking-tight">
                        Find Your Perfect Role
                    </h2>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="text-xs px-5 py-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all font-bold tracking-wide uppercase"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Main Search Row */}
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Keyword */}
                    <div className="relative flex-[2]">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
                        />
                    </div>

                    {/* Industry */}
                    <div className="flex-1">
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full"
                        >
                            <option value="" disabled>Select Industry</option>
                            {industries.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location (workFrom) */}
                    <div className="flex-1">
                        <select
                            value={workFrom}
                            onChange={(e) => setWorkFrom(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full"
                        >
                            <option value="" disabled>Select State/Location</option>
                            {workFroms.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Advanced Toggle */}
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-bold transition-all duration-200 gap-2 whitespace-nowrap
                            ${showAdvanced 
                                ? "bg-[#F8721B] text-white shadow-lg shadow-orange-500/20" 
                                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <span className="hidden sm:inline">
                            {showAdvanced ? "Hide Filters" : "Advanced Search"}
                        </span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvanced && (
                    <div className="p-6 bg-white/50 rounded-[1.5rem] border border-slate-200/60 animate-in fade-in slide-in-from-top-4 duration-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


                        {/* Licensed Type - NEW SEPARATE FILTER */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Licensed Type
                            </label>
                            <select
                                value={licensedType}
                                onChange={(e) => setLicensedType(e.target.value)}
                                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="" disabled>Select Type</option>
                                {licensedTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Physician
                            </label>

                            <select
                                value={selectedPhysician} 
                                onChange={(e) => setSelectedPhysician(e.target.value)}
                                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer"
                            >
                                <option value="">Select Physicians</option>
                                {physicians.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
        Allied Health
    </label>

    <select
        value={selectedAlliedHealth}
        onChange={(e) => setSelectedAlliedHealth(e.target.value)}
        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer"
    >
        <option value="">All Allied Health</option>
        {alliedHealthOptions.map((item, index) => (
            <option key={index} value={item}>
                {item}
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