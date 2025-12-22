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
        filters,
        experiences,
        jobTypes,
        remoteStatuses,
        workFroms,
        schedules,
    } = props;

    const [allJobs, setAllJobs] = useState(pageJobs.data);
    const [nextPageUrl, setNextPageUrl] = useState(pageJobs.next_page_url);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAllJobs(pageJobs.data);
        setNextPageUrl(pageJobs.next_page_url);
    }, [pageJobs.data, pageJobs.next_page_url]);

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
            preserveScroll: true,
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
        // <AppLayout>
        //     <section className="sm:py-24">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <div className="flex flex-col md:flex-row items-center gap-10">
        //                 <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left">
        //                     <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-teal-100 rounded-full mb-4">
        //                         The Pulse of Nursing Careers
        //                     </span>
        //                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight font-['Poppins']">
        //                         <span className="text-blue-700">Remote</span> Nursing Job Board
        //                     </h1>
        //                     <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0 font-['Inter']">
        //                         This page contains remote nurse job posts, hybrid, and onsite nursing positions. The job board is curated for nurses of all experience levels with filters to especially help those looking to transition from the bedside to a work-from-home or alternative nursing job. You can begin your search below!
        //                     </p>
        //                 </div>

        //                 <div className="md:w-1/2 order-1 md:order-2">
        //                     <img 
        //                         src="/images/nurse.jpg" 
        //                         alt="A nurse looking determined, symbolizing commitment to healthcare." 
        //                         className="w-full h-auto object-cover rounded-3xl shadow-2xl transition duration-500 hover:shadow-primary/50"
        //                         onError={(e) => e.target.src = 'https://placehold.co/800x600/F0F9FF/134E4A?text=Healthcare+Career'}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </section>

        //     <main id="job-listings" className="py-2 sm:py-20">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <Search
        //                 filters={filters}
        //                 experiences={experiences}
        //                 jobTypes={jobTypes}
        //                 remoteStatuses={remoteStatuses}
        //                 workFroms={workFroms}
        //                 schedules={schedules}
        //             />

        //             <section id="jobs bg-gradient-br from-gray-100 to-gray-200">
        //                 <div className="space-y-6">
        //                     <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4 font-['Poppins']">
        //                         Latest Jobs
        //                     </h3>

        //                     {allJobs.length > 0 ? (
        //                         <>
        //                             {allJobs.map((job, index) => (
        //                                 <div
        //                                     key={job.id}
        //                                     ref={index === allJobs.length - 1 ? lastJobRef : null}
        //                                 >
        //                                     <JobCard job={job} />
        //                                 </div>
        //                             ))}

        //                             {loading && (
        //                                 <div className="text-center py-8">
        //                                     <p className="text-gray-600">Loading more jobs...</p>
        //                                 </div>
        //                             )}

        //                             {!nextPageUrl && !loading && allJobs.length > 10 && (
        //                                 <div className="text-center py-8">
        //                                     <p className="text-gray-500">No more jobs to load.</p>
        //                                 </div>
        //                             )}
        //                         </>
        //                     ) : (
        //                         <div className="text-center py-16">
        //                             <div className="bg-gray-100 rounded-2xl p-10 max-w-md mx-auto">
        //                                 <svg
        //                                     className="w-20 h-20 mx-auto text-gray-400 mb-6"
        //                                     fill="none"
        //                                     stroke="currentColor"
        //                                     viewBox="0 0 24 24"
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                 >
        //                                     <path
        //                                         strokeLinecap="round"
        //                                         strokeLinejoin="round"
        //                                         strokeWidth="2"
        //                                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        //                                     />
        //                                 </svg>
        //                                 <h4 className="text-2xl font-bold text-gray-800 mb-3">
        //                                     No Job Found
        //                                 </h4>
        //                                 <p className="text-gray-600">
        //                                     Try adjusting your search keywords or filters to see more results.
        //                                 </p>
        //                             </div>
        //                         </div>
        //                     )}
        //                 </div>
        //             </section>

                    
        //         </div>
        //     </main>
        // </AppLayout>

    <AppLayout>
        <Head title="Remote Nursing Jobs" />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
                    The Pulse of Nursing Careers
                    </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                    Your Future in <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                    Remote Nursing
                    </span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-['Inter']">
                    Curated remote, hybrid, and alternative nursing positions. Whether you are bedside-weary or a digital health enthusiast, find your next chapter here.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a href="#job-listings" className="px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95">
                    Browse Jobs
                    </a>
                </div>
                </div>

                {/* Right Image/Visual */}
                <div className="flex-1 relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 blur-3xl opacity-20 rounded-full" />
                <div className="relative rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl transition-transform duration-700 hover:rotate-2">
                    <img 
                    src="/images/nurse.jpg" 
                    alt="Modern Nurse" 
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'}
                    />
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* --- SEARCH & LISTINGS --- */}
        <main id="job-listings" className="py-12 sm:py-20 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-12">
                <Search
                filters={filters}
                experiences={experiences}
                jobTypes={jobTypes}
                remoteStatuses={remoteStatuses}
                workFroms={workFroms}
                schedules={schedules}
                />
            </div>

            <section id="jobs">
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-['Poppins'] tracking-tight">
                    Latest Openings
                    </h3>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">
                    {allJobs.length} Position(s) found
                </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                {allJobs.length > 0 ? (
                    <>
                    {allJobs.map((job, index) => (
                        <div
                        key={job.id}
                        ref={index === allJobs.length - 1 ? lastJobRef : null}
                        className="group transition-all duration-300 hover:-translate-y-1"
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
                    <div className="text-center py-20 px-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
                    <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No jobs matched your search</h4>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        Try removing some filters or searching for broader keywords like "RN" or "Case Manager".
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