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
    const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
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
    const [selectedRn, setSelectedRn] = useState(filters.rn || "");
    const [selectedAdministrator, setSelectedAdministrator] = useState(filters.administrator || "");
    const [isInsideDropdown, setIsInsideDropdown] = useState(false);
    const [isFinalSelection, setIsFinalSelection] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedSubType, setExpandedSubType] = useState(null);
    const [expandedHealthcare, setExpandedHealthcare] = useState(null);

    const dropdownRef = useRef(null);
    const industryDropdownRef = useRef(null);
    const locationDropdownRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const industryCloseTimeoutRef = useRef(null);
    const locationCloseTimeoutRef = useRef(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cancelClose = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const cancelIndustryClose = () => {
        if (industryCloseTimeoutRef.current) {
            clearTimeout(industryCloseTimeoutRef.current);
            industryCloseTimeoutRef.current = null;
        }
    };

    const cancelLocationClose = () => {
        if (locationCloseTimeoutRef.current) {
            clearTimeout(locationCloseTimeoutRef.current);
            locationCloseTimeoutRef.current = null;
        }
    };

    const scheduleClose = () => {
        cancelClose();
        closeTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
            setHoveredHealthcare(null);
            setShowOptionsList(false);
            setIsInsideDropdown(false);
            setExpandedSubType(null);
            setExpandedHealthcare(null);
        }, 150);
    };

    const scheduleIndustryClose = () => {
        cancelIndustryClose();
        industryCloseTimeoutRef.current = setTimeout(() => {
            setIsIndustryDropdownOpen(false);
        }, 150);
    };

    const scheduleLocationClose = () => {
        cancelLocationClose();
        locationCloseTimeoutRef.current = setTimeout(() => {
            setIsLocationDropdownOpen(false);
        }, 150);
    };

    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, right: 0 });
    const [industryCoords, setIndustryCoords] = useState({ top: 0, left: 0, width: 0, right: 0 });
    const [locationCoords, setLocationCoords] = useState({ top: 0, left: 0, width: 0, right: 0 });
    const [subTypeCoords, setSubTypeCoords] = useState(null);

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

    const updateIndustryCoords = () => {
        if (industryDropdownRef.current) {
            const rect = industryDropdownRef.current.getBoundingClientRect();
            setIndustryCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                right: rect.right + window.scrollX
            });
        }
    };

    const updateLocationCoords = () => {
        if (locationDropdownRef.current) {
            const rect = locationDropdownRef.current.getBoundingClientRect();
            setLocationCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                right: rect.right + window.scrollX
            });
        }
    };

    const submitSearch = (updatedParams = {}) => {
        
        const params = {
            keyword: keyword || undefined,
            industry: industry || undefined,
            workFrom: workFrom || undefined,
            licensedIn: licensedIn || undefined,
            licensedType: licensedType || undefined,
            physician: selectedPhysician || undefined,
            allied_health: selectedAlliedHealth || undefined,
            rn: selectedRn || undefined,
            administrator: selectedAdministrator || undefined,
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
            preserveScroll: (page) => {
                return true;
            },
            replace: true,
        });
    };

    const debouncedSearch = useDebouncedCallback((val) => {
        submitSearch({ keyword: val });
    }, 500);

    useEffect(() => {
        if (isInitialMount.current) return;
        debouncedSearch(keyword);
    }, [keyword]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        submitSearch();
    }, [industry, workFrom, licensedIn, licensedType, selectedPhysician, selectedAlliedHealth, selectedRn, selectedAdministrator]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                const portaledDropdowns = document.querySelectorAll('div[data-portal-dropdown]');
                const clickedInsidePortal = Array.from(portaledDropdowns).some(
                    (el) => el.contains(e.target)
                );

                if (!clickedInsidePortal) {
                    setIsDropdownOpen(false);
                    setShowOptionsList(false);
                    setHoveredHealthcare(null);
                    setSelectedSubType(null);
                    setExpandedSubType(null);
                    setExpandedHealthcare(null);
                }
            }

            if (industryDropdownRef.current && !industryDropdownRef.current.contains(e.target)) {
                const portaledDropdowns = document.querySelectorAll('div[data-portal-dropdown]');
                const clickedInsidePortal = Array.from(portaledDropdowns).some(
                    (el) => el.contains(e.target)
                );

                if (!clickedInsidePortal) {
                    setIsIndustryDropdownOpen(false);
                }
            }

            if (locationDropdownRef.current && !locationDropdownRef.current.contains(e.target)) {
                const portaledDropdowns = document.querySelectorAll('div[data-portal-dropdown]');
                const clickedInsidePortal = Array.from(portaledDropdowns).some(
                    (el) => el.contains(e.target)
                );

                if (!clickedInsidePortal) {
                    setIsLocationDropdownOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleReset = () => {
        setKeyword("");
        setIndustry("");
        setWorkFrom("");
        setLicensedIn("");
        setLicensedType("");
        setSelectedPhysician("");
        setSelectedAlliedHealth("");
        setSelectedRn("");
        setSelectedAdministrator("");
        setSelectedDisplay("");
        setIsFinalSelection(false);
        setHoveredHealthcare(null);
        setSelectedSubType(null);
        setShowOptionsList(false);
        setExpandedSubType(null);
        setExpandedHealthcare(null);
        
        router.get(window.location.pathname, {}, { 
            preserveState: false, 
            preserveScroll: (page) => true
        });
    };

    const handleLevel3Click = (displayText, key) => {
        cancelClose();
        setIsFinalSelection(true);
        setSelectedDisplay(displayText);
        
        // Prepare the updated params
        const updatedParams = {
            physician: undefined,
            allied_health: undefined,
            rn: undefined,
            administrator: undefined,
        };

        // Set the selected value
        if (key === 'physician') {
            updatedParams.physician = displayText;
            setSelectedPhysician(displayText);
            setSelectedAlliedHealth("");
            setSelectedRn("");
            setSelectedAdministrator("");
        } else if (key === 'allied_health') {
            updatedParams.allied_health = displayText;
            setSelectedAlliedHealth(displayText);
            setSelectedPhysician("");
            setSelectedRn("");
            setSelectedAdministrator("");
        } else if (key === 'rn') {
            updatedParams.rn = displayText;
            setSelectedRn(displayText);
            setSelectedPhysician("");
            setSelectedAlliedHealth("");
            setSelectedAdministrator("");
        } else if (key === 'administrator') {
            updatedParams.administrator = displayText;
            setSelectedAdministrator(displayText);
            setSelectedPhysician("");
            setSelectedAlliedHealth("");
            setSelectedRn("");
        }

        // Close dropdowns
        setIsDropdownOpen(false);
        setShowOptionsList(false);
        setIsInsideDropdown(false);
        setExpandedSubType(null);
        setExpandedHealthcare(null);

        // Trigger search immediately with the new value
        submitSearch(updatedParams);
    };

    const toggleHealthcareExpansion = (hcId) => {
        setExpandedHealthcare(expandedHealthcare === hcId ? null : hcId);
        // Reset level 3 expansion when toggling level 2
        if (expandedHealthcare !== hcId) {
            setExpandedSubType(null);
        }
    };

    const toggleSubTypeExpansion = (hcName, typeKey) => {
        const key = `${hcName}-${typeKey}`;
        setExpandedSubType(expandedSubType === key ? null : key);
    };

    const hasActiveFilters = keyword || industry || workFrom || licensedIn || licensedType || selectedPhysician || selectedAlliedHealth || selectedRn || selectedAdministrator;

    return (
        <>
            <div className="text-center font-['Poppins'] space-y-2 pb-6">
                <p className="text-xl pb-8">REAL QUICK</p>
                <p className="text-4xl font-semibold">Here's What You</p>
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
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by Keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                style={{ caretColor: '#0f172a' }}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        {/* Industry */}
                        <div 
                            className="flex-1 relative"
                            ref={industryDropdownRef}
                            onMouseEnter={() => {
                                if (!isMobile) {
                                    updateIndustryCoords();
                                    setIsIndustryDropdownOpen(true);
                                    cancelIndustryClose();
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    scheduleIndustryClose();
                                }
                            }}
                        >
                            <button 
                                type="button" 
                                className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full text-left pl-4 flex items-center justify-between"
                                onClick={() => {
                                    if (isMobile) {
                                        updateIndustryCoords();
                                        setIsIndustryDropdownOpen(!isIndustryDropdownOpen);
                                    }
                                }}
                            >
                                <span className={industry ? "text-slate-900 font-medium" : "text-slate-500"}>
                                    {industry || "Select Industry"}
                                </span>
                                <svg className={`w-5 h-5 transition-transform ${isIndustryDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isIndustryDropdownOpen && createPortal(
                                <div 
                                    data-portal-dropdown
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ 
                                        position: 'absolute',
                                        top: industryCoords.top + 5,
                                        left: industryCoords.left,
                                        width: industryCoords.width,
                                        zIndex: 9999
                                    }}
                                    onMouseEnter={() => {
                                        if (!isMobile) {
                                            cancelIndustryClose();
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isMobile) {
                                            scheduleIndustryClose();
                                        }
                                    }}
                                >
                                    <div className="max-h-96 overflow-y-auto">
                                        {industries.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="w-full px-5 py-3 hover:bg-orange-100 text-left text-slate-800 transition-colors border-b border-slate-100 last:border-0"
                                                onClick={() => {
                                                    setIndustry(item.name);
                                                    setIsIndustryDropdownOpen(false);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>,
                                document.body
                            )}
                        </div>

                        {/* Location */}
                        <div 
                            className="flex-1 relative"
                            ref={locationDropdownRef}
                            onMouseEnter={() => {
                                if (!isMobile) {
                                    updateLocationCoords();
                                    setIsLocationDropdownOpen(true);
                                    cancelLocationClose();
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    scheduleLocationClose();
                                }
                            }}
                        >
                            <button 
                                type="button" 
                                className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full text-left pl-4 flex items-center justify-between"
                                onClick={() => {
                                    if (isMobile) {
                                        updateLocationCoords();
                                        setIsLocationDropdownOpen(!isLocationDropdownOpen);
                                    }
                                }}
                            >
                                <span className={workFrom ? "text-slate-900 font-medium" : "text-slate-500"}>
                                    {workFrom || "Select State/Location"}
                                </span>
                                <svg className={`w-5 h-5 transition-transform ${isLocationDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isLocationDropdownOpen && createPortal(
                                <div 
                                    data-portal-dropdown
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ 
                                        position: 'absolute',
                                        top: locationCoords.top + 5,
                                        left: locationCoords.left,
                                        width: locationCoords.width,
                                        zIndex: 9999
                                    }}
                                    onMouseEnter={() => {
                                        if (!isMobile) {
                                            cancelLocationClose();
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isMobile) {
                                            scheduleLocationClose();
                                        }
                                    }}
                                >
                                    <div className="max-h-96 overflow-y-auto">
                                        {workFroms.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className="w-full px-5 py-3 hover:bg-orange-100 text-left text-slate-800 transition-colors border-b border-slate-100 last:border-0"
                                                onClick={() => {
                                                    setWorkFrom(item.name);
                                                    setIsLocationDropdownOpen(false);
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>,
                                document.body
                            )}
                        </div>

                        {/* Healthcare Dropdown */}
                        <div 
                            className="flex-1 relative" 
                            ref={dropdownRef}
                            onMouseEnter={() => {
                                if (!isMobile) {
                                    updateCoords();
                                    setIsDropdownOpen(true);
                                    cancelClose();
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    scheduleClose();
                                }
                            }}
                        >
                            <button 
                                type="button" 
                                className="w-full p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 focus:ring-1 focus:ring-[#F8721B] outline-none transition-all cursor-pointer h-full text-left pl-4 flex items-center justify-between"
                                onClick={() => {
                                    if (isMobile) {
                                        updateCoords();
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }
                                }}
                            >
                                <span className={selectedDisplay ? "text-slate-900 font-medium" : "text-slate-500"}>
                                    {selectedDisplay || "Select Healthcare"}
                                </span>
                                <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && createPortal(
                                <div 
                                    data-portal-dropdown
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{ 
                                        position: 'absolute',
                                        top: coords.top + 5,
                                        left: coords.left,
                                        width: coords.width,
                                        zIndex: 9999
                                    }}
                                    onMouseEnter={() => {
                                        if (!isMobile) {
                                            cancelClose();
                                            setIsInsideDropdown(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isMobile) {
                                            scheduleClose();
                                        }
                                    }}
                                >
                                    <div className="max-h-96 overflow-y-auto">
                                        {healthcares.map((hc) => {
                                            const isExpanded = isMobile && expandedHealthcare === hc.id;
                                            const isHovered = !isMobile && hoveredHealthcare?.id === hc.id;
                                            
                                            return (
                                                <div 
                                                    key={hc.id} 
                                                    className="border-b border-slate-100 last:border-0" 
                                                    onMouseEnter={() => {
                                                        if (!isMobile) {
                                                            setHoveredHealthcare(hc);
                                                        }
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="w-full px-5 py-3 hover:bg-slate-50 text-left font-medium text-slate-800 flex items-center justify-between transition-colors"
                                                        onClick={() => {
                                                            if (isMobile) {
                                                                toggleHealthcareExpansion(hc.id);
                                                            }
                                                        }}
                                                    >
                                                        <span>{hc.name}</span>
                                                        <svg 
                                                            className={`w-4 h-4 text-slate-400 transition-transform ${isMobile && isExpanded ? 'rotate-90' : ''}`} 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                    
                                                    {(isExpanded || isHovered) && (
                                                        <div className="bg-slate-50 border-t border-slate-200">
                                                            {[{ key: 'rn', label: 'Registered Nurse (RN)' }, { key: 'physician', label: 'Physician' }, { key: 'allied_health', label: 'Allied Health' }, { key: 'administrator', label: 'Administrator' }].map(({ key, label }) => {
                                                                const raw = hc[key];
                                                                const options = Array.isArray(raw) ? raw : (raw ? [{ name: raw }] : []);
                                                                if (options.length === 0) return null;

                                                                const expansionKey = `${hc.name}-${key}`;
                                                                const isSubExpanded = expandedSubType === expansionKey;

                                                                return (
                                                                    <div key={key}>
                                                                        <div
                                                                            className="w-full px-8 py-3 text-left hover:bg-orange-100 text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                                                                            onMouseEnter={(e) => {
                                                                                if (!isMobile) {
                                                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                                                    setSubTypeCoords({
                                                                                        top: rect.top + window.scrollY,
                                                                                        left: rect.left + window.scrollX,
                                                                                        right: rect.right + window.scrollX,
                                                                                        height: rect.height,
                                                                                    });
                                                                                    setSelectedSubType({ healthcare: hc.name, type: label, options, key });
                                                                                    setShowOptionsList(true);
                                                                                }
                                                                            }}
                                                                            onClick={() => {
                                                                                if (isMobile) {
                                                                                    toggleSubTypeExpansion(hc.name, key);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <div className="font-medium text-sm">{label}</div>
                                                                            <svg 
                                                                                className={`w-4 h-4 text-slate-400 transition-transform ${isMobile && isSubExpanded ? 'rotate-90' : ''}`} 
                                                                                fill="none" 
                                                                                stroke="currentColor" 
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </div>
                                                                        
                                                                        {isMobile && isSubExpanded && (
                                                                            <div className="bg-orange-50 border-t border-orange-100">
                                                                                {options.map((option, i) => {
                                                                                    const displayText = typeof option === 'string' ? option : option?.name;
                                                                                    return (
                                                                                        <button 
                                                                                            key={i} 
                                                                                            type="button" 
                                                                                            className="w-full text-left px-12 py-2.5 hover:bg-orange-100 transition-all text-sm text-slate-800 border-b border-orange-100 last:border-0"
                                                                                            onClick={() => handleLevel3Click(displayText, key)}
                                                                                        >
                                                                                            {displayText}
                                                                                        </button>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>,
                                document.body
                            )}

                            {!isMobile && showOptionsList && selectedSubType && createPortal(
                                <div 
                                    data-portal-dropdown
                                    className="absolute bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                                    style={{
                                        position: 'absolute',
                                        top: subTypeCoords ? subTypeCoords.top : coords.top,
                                        left: (() => {
                                            const gap = 10;
                                            const menuWidth = 300;
                                            const parentLeft = subTypeCoords ? subTypeCoords.left : coords.left;
                                            const preferredLeft = parentLeft - menuWidth - gap;
                                            return preferredLeft < 0 
                                                ? (subTypeCoords?.right ?? coords.right) + gap 
                                                : preferredLeft;
                                        })(),
                                        width: '300px',
                                        zIndex: 10000,
                                    }}
                                    onMouseEnter={cancelClose}
                                    onMouseLeave={scheduleClose}
                                    onClick={cancelClose}
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
                                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-100 transition-all text-sm text-slate-800"
                                                        onClick={() => handleLevel3Click(displayText, selectedSubType.key)}
                                                    >
                                                        {displayText}
                                                    </button>
                                                );
                                            })}
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