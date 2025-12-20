import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
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
        <AppLayout>
            <section className="py-2 sm:py-24 bg-background bg-gradient-br from-gray-100 to-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left">
                            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-teal-100 rounded-full mb-4">
                                The Pulse of Nursing Careers
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight font-['Poppins']">
                                <span className="text-blue-700">Remote</span> Nursing Job Board
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0 font-['Inter']">
                                This page contains remote nurse job posts, hybrid, and onsite nursing positions. The job board is curated for nurses of all experience levels with filters to especially help those looking to transition from the bedside to a work-from-home or alternative nursing job. You can begin your search below!
                            </p>
                        </div>

                        <div className="md:w-1/2 order-1 md:order-2">
                            <img 
                                src="/images/nurse.jpg" 
                                alt="A nurse looking determined, symbolizing commitment to healthcare." 
                                className="w-full h-auto object-cover rounded-3xl shadow-2xl transition duration-500 hover:shadow-primary/50"
                                onError={(e) => e.target.src = 'https://placehold.co/800x600/F0F9FF/134E4A?text=Healthcare+Career'}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main id="job-listings" className="py-2 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Search
                        filters={filters}
                        experiences={experiences}
                        jobTypes={jobTypes}
                        remoteStatuses={remoteStatuses}
                        workFroms={workFroms}
                        schedules={schedules}
                    />

                    <section id="jobs bg-gradient-br from-gray-100 to-gray-200">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4 font-['Poppins']">
                                Latest Jobs
                            </h3>

                            {allJobs.length > 0 ? (
                                <>
                                    {allJobs.map((job, index) => (
                                        <div
                                            key={job.id}
                                            ref={index === allJobs.length - 1 ? lastJobRef : null}
                                        >
                                            <JobCard job={job} />
                                        </div>
                                    ))}

                                    {loading && (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600">Loading more jobs...</p>
                                        </div>
                                    )}

                                    {!nextPageUrl && !loading && allJobs.length > 10 && (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No more jobs to load.</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-gray-100 rounded-2xl p-10 max-w-md mx-auto">
                                        <svg
                                            className="w-20 h-20 mx-auto text-gray-400 mb-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <h4 className="text-2xl font-bold text-gray-800 mb-3">
                                            No Job Found
                                        </h4>
                                        <p className="text-gray-600">
                                            Try adjusting your search keywords or filters to see more results.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    
                </div>
            </main>
        </AppLayout>
    );
}