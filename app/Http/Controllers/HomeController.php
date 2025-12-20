<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AllJob;
use App\Models\JobType;
use App\Models\Schedule;
use App\Models\Experience;
use App\Models\LicensedIn;
use App\Models\RemoteStatus;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = AllJob::with([
            'company',
            'jobTypes',
            'specialities',
            'jobLicensedIns',
            'jobRemoteStatuses',
            'jobWorkFroms',
            'experiences',
        ]);

        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->keyword}%")
                ->orWhere('description', 'like', "%{$request->keyword}%");
            });
        }

        if ($request->filled('experience')) {
            $query->whereHas('experiences', fn($q) => $q->where('title', $request->experience));
        }

        if ($request->filled('jobType')) {
            $query->whereHas('jobTypes', fn($q) => $q->where('name', $request->jobType));
        }

        if ($request->filled('remoteStatus')) {
            $query->whereHas('jobRemoteStatuses', fn($q) => $q->where('name', $request->remoteStatus));
        }

        if ($request->filled('schedule')) {
            $query->where('schedule', $request->schedule);
        }

        $userCompanyId = auth()->check() ? auth()->user()->company_id : null;
        $userId = auth()->id();

        $jobs = $query->latest()->simplePaginate(10)->through(function ($job) use ($userCompanyId, $userId) {
        $isCompanyMember = ($userCompanyId !== null && $userCompanyId === $job->company_id);

        $alreadyApplied = false;
        if ($userId) {
            $alreadyApplied = $job->applications()
                ->where('user_id', $userId)
                ->exists();
        }

        return [
            'id' => $job->id,
            'title' => $job->title,
            'slug' => $job->slug,
            'description' => $job->description,
            'already_applied' => $alreadyApplied,
            'can_apply' => !$isCompanyMember,
            'company' => [
                'id' => $job->company_id,
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
        ];
    });

        return Inertia::render('Home', [
            'jobs' => $jobs,
            'filters' => $request->all(),
            'experiences' => Experience::all(['id', 'title']),
            'jobTypes' => JobType::all(['id', 'name']),
            'remoteStatuses' => RemoteStatus::all(['id', 'name']),
            'workFroms' => LicensedIn::all(['id', 'name', 'short']),
            'schedules' => Schedule::all(['id', 'name']),
        ]);
    }
}
