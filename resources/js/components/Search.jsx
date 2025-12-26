import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";
import Portal from './Portal';

export default function Search({
    filters = {},
    industries = [],
    workFroms = [],
    licensedIns = [],
    licensedTypes = [],
    physicians = [],
    alliedHealthOptions = [],
    healthcares = [],
}) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [keyword, setKeyword] = useState(filters.keyword || "");
    const [industry, setIndustry] = useState(filters.industry || "");
    const [workFrom, setWorkFrom] = useState(filters.workFrom || "");
    const [licensedIn, setLicensedIn] = useState(filters.licensedIn || "");
    const [licensedType, setLicensedType] = useState(filters.licensedType || "");
    const [selectedPhysician, setSelectedPhysician] = useState(filters.physician || "");
    const [selectedAlliedHealth, setSelectedAlliedHealth] = useState(filters.allied_health || "");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredHealthcare, setHoveredHealthcare] = useState(null);
    const [selectedSubType, setSelectedSubType] = useState(null);
    const [selectedDisplay, setSelectedDisplay] = useState("");
    const [showOptionsList, setShowOptionsList] = useState(false);

const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

const closeTimeoutRef = useRef(null);

// Clear timeout on any interaction
const clearCloseTimeout = () => {
  if (closeTimeoutRef.current) {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }
};

// Delayed close
const delayedClose = () => {
  clearCloseTimeout();
  closeTimeoutRef.current = setTimeout(() => {
    setIsDropdownOpen(false);
    setIsHoveringDropdown(false);
  }, 200); // 200ms delay — enough to move mouse down
};

// Open immediately
const openDropdown = () => {
  clearCloseTimeout();
  setIsDropdownOpen(true);
};

// Close on outside click (keep your existing useEffect for clicks)
useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
      setIsHoveringDropdown(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// Also close on escape key (optional bonus)
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsHoveringDropdown(false);
    }
  };
  if (isDropdownOpen) {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }
}, [isDropdownOpen]);

    const dropdownRef = useRef(null);

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


    useEffect(() => {
        if (!selectedSubType) {
            setSelectedDisplay("");
            return;
        }

        const { healthcare, type } = selectedSubType;
        setSelectedDisplay(`${type} → ${healthcare}`);

        // Map to existing filter fields
        if (selectedSubType.key === 'physician') {
            setSelectedPhysician(""); // Reset first
            // We'll need a second dropdown or modal for final pick
            // For now, just show category selected
        } else if (selectedSubType.key === 'allied_health') {
            setSelectedAlliedHealth("");
        }
        // Extend later for RN/admin if you add fields
    }, [selectedSubType]);


    useEffect(() => {
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


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

        setSelectedDisplay("");
        setHoveredHealthcare(null);
        setSelectedSubType(null);
        setShowOptionsList(false);
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


                    {/* Nested Healthcare Dropdown */}
                    <div 
    className="flex-1 relative" 
    ref={dropdownRef}
    // LEVEL 1 HOVER
    onMouseEnter={() => setIsDropdownOpen(true)}
    onMouseLeave={() => {
        setIsDropdownOpen(false);
        setHoveredHealthcare(null); // Reset sub-menus when leaving the main area
        setShowOptionsList(false);
    }}
>
    <button
        type="button"
        className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full text-left pl-4 flex items-center justify-between"
    >
        <span className={selectedDisplay ? "text-slate-900 font-medium" : "text-slate-500"}>
            {selectedDisplay || "Select Healthcare"}
        </span>
        <svg 
            className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    {/* MAIN DROPDOWN (Level 1 Menu) */}
    {isDropdownOpen && (
        <div 
            className="absolute left-0 right-0 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            style={{ top: 'calc(100% - 1px)', zIndex: 2147483647 }}
        >
            <div className="max-h-96 overflow-y-auto">
                {healthcares.length === 0 ? (
                    <div className="px-5 py-8 text-center text-slate-500">No categories</div>
                ) : (
                    healthcares.map((hc) => (
                        <div 
                            key={hc.id} 
                            className="border-b border-slate-100 last:border-0"
                            // LEVEL 2 HOVER: Show sub-types when hovering a category
                            onMouseEnter={() => setHoveredHealthcare(hc)}
                        >
                            <div className="w-full px-5 py-3 hover:bg-slate-50 text-left font-medium text-slate-800 flex items-center justify-between transition-colors cursor-default">
                                <span>{hc.name}</span>
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            {/* LEVEL 2: Sub-types List */}
                            {hoveredHealthcare?.id === hc.id && (
                                <div className="bg-slate-50 border-t border-slate-200">
                                    {[
                                        { key: 'rn', label: 'Registered Nurse (RN)' },
                                        { key: 'physician', label: 'Physician' },
                                        { key: 'allied_health', label: 'Allied Health' },
                                        { key: 'administrator', label: 'Administrator' },
                                    ].map(({ key, label }) => {
                                        const options = hc[key] || [];
                                        if (options.length === 0) return null;

                                        return (
                                            <div
                                                key={key}
                                                // LEVEL 3 HOVER: Show options list when hovering a sub-type
                                                onMouseEnter={() => {
                                                    setSelectedSubType({
                                                        healthcare: hc.name,
                                                        type: label,
                                                        options,
                                                        key,
                                                    });
                                                    setShowOptionsList(true);
                                                }}
                                                className="w-full px-8 py-3 text-left hover:bg-orange-100 text-slate-700 flex justify-between items-center transition-colors cursor-default"
                                            >
                                                <div>
                                                    <div className="font-medium">{label}</div>
                                                    <div className="text-xs text-slate-500">{options.length} options</div>
                                                </div>
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )}

    {/* LEVEL 3: Options List (Floating Sidebar) */}
    {showOptionsList && selectedSubType && (
        <div 
            className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            // Position this to the RIGHT of the main menu for a true fly-out feel
            style={{ 
                top: 'calc(100% - 1px)', 
                left: '100%', 
                marginLeft: '10px',
                width: '300px',
                zIndex: 2147483647 
            }}
            // Stay open while hovering the list
            onMouseEnter={() => setShowOptionsList(true)}
        >
            <div className="max-h-96 overflow-y-auto">
                <div className="px-6 py-4 bg-orange-50 border-b border-slate-200 sticky top-0 z-10">
                    <h3 className="text-sm font-bold text-slate-900">{selectedSubType.type}</h3>
                </div>
                <div className="p-2">
                    {selectedSubType.options.map((option, i) => {
                        const displayText = typeof option === 'string' ? option : option?.name;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    setSelectedDisplay(displayText);
                                    setIsDropdownOpen(false);
                                    setShowOptionsList(false);
                                }}
                                className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 transition-all text-sm text-slate-800"
                            >
                                {displayText}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )}
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