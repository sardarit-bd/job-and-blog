import { usePage } from "@inertiajs/react";
import { router, Head } from "@inertiajs/react";
import { useEffect, useRef, useState, useCallback } from "react";
import JobCard from "../components/JobCard";
import AppLayout from "../layouts/AppLayout";
import Search from "../components/Search";

export default function Home() {
    const { props } = usePage();

    const {
        jobs: pageJobs,
        hero,
        filters,
        industries,
        workFroms,
        licensedIns,
        licensedTypes,
        physicians,
        alliedHealthOptions,
        healthcares = [],
    } = props;


    const [allJobs, setAllJobs] = useState(pageJobs.data);
    const [nextPageUrl, setNextPageUrl] = useState(pageJobs.next_page_url);
    const [loading, setLoading] = useState(false);

    // Use a ref to track if we're filtering
    const isFilteringRef = useRef(false);
    const searchSectionRef = useRef(null);
    const savedScrollPosition = useRef(null);
    const preventScrollRestore = useRef(false);

    useEffect(() => {
        
        // Capture current scroll immediately
        const currentScroll = window.scrollY;
        
        // Check if this is a reset (no filters at all)
        const hasNoFilters = !filters.keyword && !filters.industry && !filters.workFrom && 
                             !filters.licensedIn && !filters.licensedType && !filters.physician && 
                             !filters.allied_health && !filters.rn && !filters.administrator;
        
        
        if (hasNoFilters) {
          
            preventScrollRestore.current = true;
            savedScrollPosition.current = null;  // Clear any saved scroll position
        }
        
        // Only save scroll position if NOT in prevent mode
        if (!preventScrollRestore.current && allJobs.length > 0 && pageJobs.data.length !== allJobs.length) {
            
            savedScrollPosition.current = window.scrollY;
        }
        
        // Check if this is a filter change (jobs reset to first page)
        if (pageJobs.data.length > 0 && allJobs.length > pageJobs.data.length) {
            
            isFilteringRef.current = true;
        }
        
        setAllJobs(pageJobs.data);
        setNextPageUrl(pageJobs.next_page_url);
        
        // Restore scroll position after render ONLY if not in prevent mode
        if (!preventScrollRestore.current && savedScrollPosition.current !== null) {
           
            requestAnimationFrame(() => {
                window.scrollTo(0, savedScrollPosition.current);
              
                setTimeout(() => {
                    window.scrollTo(0, savedScrollPosition.current);
                    savedScrollPosition.current = null;
                }, 0);
            });
        } else {
           
            // If we're in reset mode, force maintain the current scroll
            if (preventScrollRestore.current && currentScroll > 0) {
                
                requestAnimationFrame(() => {
                    window.scrollTo(0, currentScroll);
                    setTimeout(() => {
                        window.scrollTo(0, currentScroll);
                    }, 0);
                    setTimeout(() => {
                        window.scrollTo(0, currentScroll);
                    }, 50);
                    setTimeout(() => {
                        window.scrollTo(0, currentScroll);
                    }, 100);
                });
            }
        }
        
        // Reset the prevent flag after a delay
        if (preventScrollRestore.current) {
            setTimeout(() => {
                
                preventScrollRestore.current = false;
            }, 500);
        }
        
        // Reset filtering flag after a brief delay
        if (isFilteringRef.current) {
            setTimeout(() => {
                isFilteringRef.current = false;
            }, 100);
        }
        
        
    }, [pageJobs.data, pageJobs.next_page_url, filters]);

    const observerRef = useRef();

    const lastJobRef = useCallback(
        (node) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && nextPageUrl) {
                    loadMore();
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading, nextPageUrl]
    );

    const loadMore = () => {
        if (!nextPageUrl || loading) return;

        setLoading(true);

        router.visit(nextPageUrl, {
            preserveState: true,
            preserveScroll: (page) => true,
            only: ['jobs'],
            onSuccess: (page) => {
                const newJobs = page.props.jobs;
                setAllJobs((prev) => [...prev, ...newJobs.data]);
                setNextPageUrl(newJobs.next_page_url);
                setLoading(false);
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
    <AppLayout>
        <Head title="Home | Job Board" />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-5 pb-5 sm:pt-24 sm:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                                {hero?.moto || 'The Pulse of Nursing Careers'}
                            </span>
                        </div>
                        

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                            <div 
                                className="inline-block [&_.color]:text-[var(--color)] [&_strong]:font-extrabold"
                                dangerouslySetInnerHTML={{
                                    __html: hero?.heading || 
                                        '<strong>Your Future in<br><span class="color" style="--color: #F8721B; --dark-color: #F97316;">Remote Nursing</span></strong>'
                                }}
                            />
                        </h1>

                        <p className="mt-2 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-['Inter']">
                            {hero?.sub_heading || 'Explore a premier job board featuring curated opportunities across every major industry, including healthcare, legal, finance, tech, and construction. Our platform offers a strategic mix of remote, hybrid, and onsite positions designed for professionals at every experience level. Whether you are looking to advance in your current field or transition into a new environment, our specialized listings provide the flexibility and variety you need to find your perfect fit.'}
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a href="#job-listings" className="px-8 py-3 bg-[#F8721B] text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 transition-transform active:scale-95">
                                Browse Jobs
                            </a>
                        </div>
                    </div>

                    {/* Right Image/Visual */}
                    <div className="flex-1 relative w-full max-w-2xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 blur-3xl opacity-20 rounded-full" />
                        <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl transition-transform duration-700 hover:rotate-2">
                            <img
                                src={`/storage/${hero.image}` || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'}
                                alt="Modern Nurse"
                                className="w-full h-[400px] sm:h-[500px] object-cover"
                                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- SEARCH & LISTINGS --- */}
        <main
            id="job-listings"
            className="py-10 sm:py-20 bg-slate-50/50 backdrop-blur-sm border-t border-slate-200"
            style={{ overflowAnchor: "none" }}
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-12">
                    <Search
                        filters={filters}
                        industries={industries}
                        workFroms={workFroms}
                        licensedIns={licensedIns}
                        licensedTypes={licensedTypes}
                        physicians={physicians}
                        alliedHealthOptions={alliedHealthOptions}
                        healthcares={healthcares}
                    />

                </div>

                <section id="jobs" className="min-h-[100vh]" style={{ minHeight: allJobs.length > 0 ? 'max(100vh, 1200px)' : 'auto' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-slate-200 pb-6">
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900 font-['Poppins'] tracking-tight">
                                Latest Openings
                            </h3>
                        </div>

                        <div className="self-start sm:self-center mt-4 sm:mt-0">
                            <span className="inline-block text-sm text-black bg-[#BCD0CA] px-4 py-1.5 rounded-full">
                                {pageJobs.total || allJobs.length} Position(s) found
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 relative" style={{ minHeight: allJobs.length > 0 ? '800px' : 'auto' }}>
                        {allJobs.length > 0 ? (
                            <>
                                {allJobs.map((job, index) => (
                                    <div
                                        key={`${job.id}-${index}`}
                                        ref={index === allJobs.length - 1 ? lastJobRef : null}
                                        className="group relative transition-all duration-300 hover:-translate-y-1 hover:z-50"
                                    >
                                        <JobCard job={job} />
                                    </div>
                                ))}

                                {loading && (
                                    <div className="flex flex-col items-center py-12">
                                        <div className="h-10 w-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                                        <p className="mt-4 text-slate-500 font-medium">Loading more opportunities...</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-10 px-6 rounded-[2rem] bg-white border border-dashed border-slate-300">
                                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">No jobs matched your search</h4>
                                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                    Try removing some filters or searching for broader keywords.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    </AppLayout>
    );
}