<?php

namespace App\Http\Controllers;

use App\Models\AllJob;
use Inertia\Inertia;

class JobDetailController extends Controller
{
    public function __invoke()
    {
        $jobModel = AllJob::with([
            'company',
            'jobTypes',
            'specialities',
            'jobLicensedIns',
            'jobRemoteStatuses',
            'jobWorkFroms',
            'experiences',
        ])
        ->where('slug', request()->slug)
        ->firstOrFail();

        $alreadyApplied = auth()->check()
            ? $jobModel->applications()
                ->where('user_id', auth()->id())
                ->exists()
            : false;

        $job = [
            'id' => $jobModel->id,
            'title' => $jobModel->title,
            'slug' => $jobModel->slug,
            'description' => $jobModel->description,
            'already_applied' => $alreadyApplied,

            'company' => [
                'name' => $jobModel->company?->name,
                'logo' => $jobModel->company?->image
                    ? asset('storage/' . $jobModel->company->image)
                    : null,
                'description' => $jobModel->company?->description,
            ],

            'job_types' => $jobModel->jobTypes->pluck('name'),
            'specialities' => $jobModel->specialities->pluck('name'),
            'licenses' => $jobModel->jobLicensedIns->pluck('name', 'short'),
            'remote_statuses' => $jobModel->jobRemoteStatuses->pluck('name'),
            'work_from' => $jobModel->jobWorkFroms->pluck('name', 'short'),
            'experiences' => $jobModel->experiences->pluck('title'),
            'salary_range' => $jobModel->salary_range,
            'salaray_transparency' => $jobModel->salaray_transparency,
            'schedule' => $jobModel->schedule,
            'image' => $jobModel->image,
            'posted_at' => $jobModel->created_at->format('m-d-Y'),
        ];

        return Inertia::render('JobDetail', [
            'job' => $job,
        ]);
    }
}
