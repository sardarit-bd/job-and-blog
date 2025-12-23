<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AllJob;
use App\Models\JobType;
use App\Models\Industry;
use App\Models\Schedule;
use App\Models\Experience;
use App\Models\Hero;
use App\Models\LicensedIn;
use App\Models\RemoteStatus;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $userId = auth()->id();
        
        $query = AllJob::with([
            'company',
            'industries',
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
                ->orWhere('description', 'like', "%{$request->keyword}%")
                ->orWhere('license_type', 'like', "%{$request->keyword}%")
                ->orWhere('schedule', 'like', "%{$request->keyword}%");
            });
        }

        if ($request->filled('industry')) {
            $query->whereHas('industries', fn($q) => $q->where('name', $request->industry));
        }

        if ($request->filled('workFrom')) {
            $query->whereHas('jobWorkFroms', fn($q) => $q->where('name', $request->workFrom));
        }

        if ($request->filled('licensedIn')) {
            $query->whereHas('jobLicensedIns', fn($q) => $q->where('name', $request->licensedIn));
        }

        $userCompanyId = auth()->check() ? auth()->user()->id : null;
        $userId = auth()->id();

        $jobs = $query->latest()->simplePaginate(10)->through(function ($job) use ($userId) {
            // Check if the current user is the owner of the job post
        $isOwner = ($userId !== null && (int)$userId === (int)$job->user_id);

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
            
            // A user cannot apply if they are the owner OR if they already applied
            'can_apply' => !$isOwner, 
            
            'company' => [
                'id' => $job->company_id,
                'name' => $job->company?->name,
                'logo' => $job->company?->image ? asset('storage/' . $job->company->image) : null,
                'description' => $job->company?->description,
            ],
            // ... rest of your mapping code
            'job_types' => $job->jobTypes->pluck('name'),
            'specialities' => $job->specialities->pluck('name'),
            'licenses' => $job->jobLicensedIns->pluck('name', 'short'),
            'remote_statuses' => $job->jobRemoteStatuses->pluck('name'),
            'work_from' => $job->jobWorkFroms->pluck('name', 'short'),
            'experiences' => $job->experiences->pluck('title'),
            'salary_range' => $job->salary_range,
            'salaray_transparency' => $job->salaray_transparency,
            'schedule' => $job->schedule,
            'image' => $job->image_url,
            'posted_at' => date('m-d-Y', strtotime($job->created_at)),
        ];
        });

        $hero = Hero::latest()->first();

        return Inertia::render('Home', [
            'hero' => $hero,
            'jobs' => $jobs,
            'filters' => $request->all(),
            'industries' => Industry::all(['id', 'name']),
            'workFroms' => LicensedIn::all(['id', 'name', 'short']),
            'licensedIns' => LicensedIn::all(['id', 'name', 'short']),
        ]);
    }
}
