import { useState, useEffect, useRef } from "react";
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

    const isManualChange = useRef(false);


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

        const queryParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== undefined)
        );

        const scrollPosition = window.scrollY;

        router.visit(window.location.pathname, {
            method: 'get',
            data: queryParams,
            only: ['jobs', 'filters'],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };


    useEffect(() => {
        debouncedSearch(keyword);
    }, [keyword, debouncedSearch]);
    


    useEffect(() => {
        submitSearch();
    }, [industry, workFrom, licensedIn, licensedType, selectedPhysician, selectedAlliedHealth]);


    const isResetting = useRef(false);

    const handleReset = () => {
        isResetting.current = true;

        const states = [setKeyword, setIndustry, setWorkFrom, setLicensedIn, setLicensedType, setSelectedPhysician, setSelectedAlliedHealth];
        states.forEach(fn => fn(""));

        router.get(window.location.pathname, {}, {
            preserveState: false,
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                isResetting.current = false;
            }
        });
    };

    useEffect(() => {
        setLicensedType(filters.licensedType || "");
    }, [filters.licensedType]);


    const hasActiveFilters = keyword || industry || workFrom || licensedIn || licensedType || selectedPhysician || selectedAlliedHealth;

    return (
        <>
        <div className="text-center font-['Poppins'] space-y-2 pb-6">
            <p className="text-xl pb-8">REAL QUICK</p>
            <p className="text-4xl font-semibold">Here’s What You</p>
            <p className="text-4xl text-[#FB721B] font-semibold border-b-4 border-[#FB721B] inline-block pb-7">Need to Know</p>
        </div>

        <div className="text-center pb-6">
            <p className="text-black text-[17px] font-['Poppins'] opacity-75 tracking-tight leading-relaxed">
                Search by keyword, location, industry, job type. Our job board features opportunities from every major industry—including healthcare, legal, finance, tech, IT, construction, and more. This page contains a curated mix of remote, hybrid, and onsite positions for professionals at all experience levels. <br />
                Begin your search below!
            </p>
        </div>
        <div className="bg-[#F2EBE6] backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-2xl shadow-slate-200 mb-12 border border-slate-100 transition-all duration-500">

            {/* Header and Reset Button */}
            <div className="flex flex-col gap-6 mb-6">
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-fit sm:self-end text-xs px-5 py-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all font-bold tracking-wide uppercase text-center"
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

                    {/* healthcare filters */}
                    <div className="flex-1">
                        <select
                            value={workFrom}
                            onChange={(e) => setWorkFrom(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full"
                        >
                            <option value="" disabled>Select healthcare</option>
                            {workFroms.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Advanced Toggle */}
                    {/* <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center justify-center px-6 py-3 rounded-2xl font-bold transition-all duration-200 gap-2 whitespace-nowrap
                            ${showAdvanced 
                                ? "bg-[#F8721B] text-white shadow-lg shadow-orange-500/20" 
                                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <span className=" sm:inline">
                            {showAdvanced ? "Hide Filters" : "Advanced Search"}
                        </span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button> */}
                </div>

                {/* Advanced Filters Panel */}
                
            </div>
        </div>
        </>
    );
}