import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";
import { createPortal } from "react-dom";

export default function Search({
    filters = {},
    industries = [],
    workFroms = [],
    licensedIn: licensedInOptions = [],
    licensedTypes = [],
    physicians = [],
    alliedHealthOptions = [],
    healthcares = [],
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredHealthcare, setHoveredHealthcare] = useState(null);
    const [selectedSubType, setSelectedSubType] = useState(null);
    const [selectedDisplay, setSelectedDisplay] = useState("");
    const [showOptionsList, setShowOptionsList] = useState(false);
    const [keyword, setKeyword] = useState(filters.keyword || "");
    const [industry, setIndustry] = useState(filters.industry || "");
    const [workFrom, setWorkFrom] = useState(filters.workFrom || "");
    const [licensedIn, setLicensedIn] = useState(filters.licensedIn || "");
    const [licensedType, setLicensedType] = useState(filters.licensedType || "");
    const [selectedPhysician, setSelectedPhysician] = useState(filters.physician || "");
    const [selectedAlliedHealth, setSelectedAlliedHealth] = useState(filters.allied_health || "");

    const dropdownRef = useRef(null);

    // Helper to get button position for the Portal
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

    const updateCoords = () => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                right: rect.right + window.scrollX
            });
        }
    };

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
        router.visit(window.location.pathname, {
            method: 'get',
            data: queryParams,
            only: ['jobs', 'filters'],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => { debouncedSearch(keyword); }, [keyword]);
    useEffect(() => { submitSearch(); }, [industry, workFrom, licensedIn, licensedType, selectedPhysician, selectedAlliedHealth]);

    useEffect(() => {
        if (!selectedSubType) {
            setSelectedDisplay("");
            return;
        }
        const { healthcare, type } = selectedSubType;
        setSelectedDisplay(`${type} → ${healthcare}`);
    }, [selectedSubType]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
                setShowOptionsList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleReset = () => {
        const states = [setKeyword, setIndustry, setWorkFrom, setLicensedIn, setLicensedType, setSelectedPhysician, setSelectedAlliedHealth];
        states.forEach(fn => fn(""));
        router.get(window.location.pathname, {}, { preserveState: false, preserveScroll: true });
        setSelectedDisplay("");
        setHoveredHealthcare(null);
        setSelectedSubType(null);
        setShowOptionsList(false);
    };

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
                <div className="flex flex-col gap-6 mb-6">
                    {hasActiveFilters && (
                        <button onClick={handleReset} className="w-full sm:w-fit sm:self-end text-xs px-5 py-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all font-bold tracking-wide uppercase text-center">
                            Clear All Filters
                        </button>
                    )}
                </div>

                <div className="space-y-6">
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
                            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full">
                                <option value="" disabled>Select Industry</option>
                                {industries.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="flex-1">
                            <select value={workFrom} onChange={(e) => setWorkFrom(e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full">
                                <option value="" disabled>Select State/Location</option>
                                {workFroms.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                            </select>
                        </div>

                        {/* Healthcare Dropdown Toggle Area */}
                        <div 
                            className="flex-1 relative" 
                            ref={dropdownRef}
                            onMouseEnter={() => {
                                updateCoords();
                                setIsDropdownOpen(true);
                            }}
                            onMouseLeave={() => {
                                setIsDropdownOpen(false);
                                setHoveredHealthcare(null);
                                setShowOptionsList(false);
                            }}
                        >
                            <button type="button" className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full text-left pl-4 flex items-center justify-between">
                                <span className={selectedDisplay ? "text-slate-900 font-medium" : "text-slate-500"}>
                                    {selectedDisplay || "Select Healthcare"}
                                </span>
                                <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* PORTAL: Level 1 & 2 Menu */}
                            {isDropdownOpen && createPortal(
                                <div 
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ 
                                        position: 'absolute',
                                        top: coords.top,
                                        left: coords.left,
                                        width: coords.width,
                                        zIndex: 9999
                                    }}
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <div className="max-h-96 overflow-y-auto">
                                        {healthcares.map((hc) => (
                                            <div key={hc.id} className="border-b border-slate-100 last:border-0" onMouseEnter={() => setHoveredHealthcare(hc)}>
                                                <div className="w-full px-5 py-3 hover:bg-slate-50 text-left font-medium text-slate-800 flex items-center justify-between transition-colors cursor-default">
                                                    <span>{hc.name}</span>
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                                {hoveredHealthcare?.id === hc.id && (
                                                    <div className="bg-slate-50 border-t border-slate-200">
                                                        {[{ key: 'rn', label: 'Registered Nurse (RN)' }, { key: 'physician', label: 'Physician' }, { key: 'allied_health', label: 'Allied Health' }, { key: 'administrator', label: 'Administrator' }].map(({ key, label }) => {
                                                            const options = hc[key] || [];
                                                            if (options.length === 0) return null;
                                                            return (
                                                                <div key={key} className="w-full px-8 py-3 text-left hover:bg-orange-100 text-slate-700 flex justify-between items-center transition-colors cursor-default"
                                                                    onMouseEnter={() => {
                                                                        setSelectedSubType({ healthcare: hc.name, type: label, options, key });
                                                                        setShowOptionsList(true);
                                                                    }}
                                                                >
                                                                    <div><div className="font-medium text-sm">{label}</div></div>
                                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>,
                                document.body
                            )}

                            {/* PORTAL: Level 3 Fly-out */}
                            {showOptionsList && selectedSubType && createPortal(
                                <div 
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ 
                                        position: 'absolute',
                                        top: coords.top, 
                                        left: coords.right + 10, 
                                        width: '300px',
                                        zIndex: 10000 
                                    }}
                                    onMouseEnter={() => setShowOptionsList(true)}
                                    onMouseLeave={() => setShowOptionsList(false)}
                                >
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="px-6 py-4 bg-orange-50 border-b border-slate-200 sticky top-0 z-10">
                                            <h3 className="text-sm font-bold text-slate-900">{selectedSubType.type}</h3>
                                        </div>
                                        <div className="p-2">
                                            {/* ADD THE ARRAY CHECK HERE */}
                                            {Array.isArray(selectedSubType.options) ? (
                                                selectedSubType.options.map((option, i) => {
                                                    const displayText = typeof option === 'string' ? option : option?.name;
                                                    return (
                                                        <button 
                                                            key={i} 
                                                            type="button" 
                                                            className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 transition-all text-sm text-slate-800"
                                                            onClick={() => {
                                                                setSelectedDisplay(displayText);
                                                                setIsDropdownOpen(false);
                                                                setShowOptionsList(false);
                                                            }}
                                                        >
                                                            {displayText}
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-slate-500">No options available</div>
                                            )}
                                        </div>
                                    </div>
                                </div>,
                                document.body
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}