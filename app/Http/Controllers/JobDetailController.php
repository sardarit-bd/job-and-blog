<?php

namespace App\Http\Controllers;

use App\Models\AllJob;
use Inertia\Inertia;

class JobDetailController extends Controller
{
    public function __invoke()  
    {
        $job = AllJob::with([
            'company',
            'jobTypes',
            'specialities',
            'jobLicensedIns',
            'jobRemoteStatuses',
            'jobWorkFroms',
            'experiences',
        ])->where('slug', request()->slug)->firstOrFail();

        $job = array_merge($job->toArray(), [
            'id' => $job->id,
            'title' => $job->title,
            'slug' => $job->slug,
            'description' => $job->description,
            'company' => [
                'name' => $job->company?->name,
                'logo' => $job->company?->image ? asset('storage/' . $job->company->image) : null,
                'description' => $job->company?->description,
            ],
            'job_types' => $job->jobTypes->pluck('name'),
            'specialities' => $job->specialities->pluck('name'),
            'licenses' => $job->jobLicensedIns->pluck('name', 'short'),
            'remote_statuses' => $job->jobRemoteStatuses->pluck('name'),
            'work_from' => $job->jobWorkFroms->pluck('name', 'short'),
            'experiences' => $job->experiences->pluck('title'),
            'salary_range' => $job->salary_range,
            'salaray_transparency' => $job->salaray_transparency,
            'schedule' => $job->schedule,
            'image' => $job->image,
            'posted_at' => date('m-d-Y', strtotime($job->created_at)), 
        ]);

        return Inertia::render('JobDetail', [
            'job' => $job
        ]);
    }
}
