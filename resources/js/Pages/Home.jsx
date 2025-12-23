import { usePage } from "@inertiajs/react";
import { router, Head } from "@inertiajs/react";
import { useEffect, useRef, useState, useCallback } from "react";
import JobCard from "../components/JobCard";
import AppLayout from "../layouts/AppLayout";
import Search from "../components/Search";

export default function Home() {
    const { props } = usePage();
    // const {
    //     jobs: pageJobs,
    //     filters,
    //     experiences,
    //     jobTypes,
    //     remoteStatuses,
    //     workFroms,
    //     schedules,
    // } = props;

    const {
        jobs: pageJobs,
        filters,
        industries,
        workFroms,
        licensedIns,
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
    <AppLayout>
        <Head title="Remote Nursing Jobs" />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-5 pb-5 sm:pt-24 sm:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                                The Pulse of Nursing Careers
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            Your Future in <br />
                            <span className="text-transparent bg-clip-text bg-[#F8721B]">
                                Remote Nursing
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-['Inter']">
                            Curated remote, hybrid, and alternative nursing positions. Whether you are bedside-weary or a digital health enthusiast, find your next chapter here.
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
                                src="/images/nurse.jpg"
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
        <main id="job-listings" className="py-10 sm:py-20 bg-slate-50/50 backdrop-blur-sm border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-12">
                    <Search
                        filters={filters}
                        industries={industries}
                        workFroms={workFroms}
                        licensedIns={licensedIns}
                    />
                </div>

                <section id="jobs">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-6">
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900 font-['Poppins'] tracking-tight">
                                Latest Openings
                            </h3>
                        </div>
                        <span className="text-sm text-black bg-[#BCD0CA] px-4 py-1.5 rounded-full">
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
                            <div className="text-center py-20 px-6 rounded-[2.5rem] bg-white border border-dashed border-slate-300">
                                <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-2">No jobs matched your search</h4>
                                <p className="text-slate-500 max-w-sm mx-auto">
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