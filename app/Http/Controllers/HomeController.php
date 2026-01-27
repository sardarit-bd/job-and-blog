<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Inertia\Inertia;
use App\Models\AllJob;
use App\Models\JobType;
use App\Models\Industry;
use App\Models\Schedule;
use App\Models\Experience;
use App\Models\Healthcare;
use App\Models\LicensedIn;
use App\Models\LicensedType;
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
            'healthcare.industry', // Load healthcare with industry relationship
        ]);

        // Keyword search
        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->keyword}%")
                ->orWhere('description', 'like', "%{$request->keyword}%")
                ->orWhere('license_type', 'like', "%{$request->keyword}%")
                ->orWhere('schedule', 'like', "%{$request->keyword}%");
            });
        }

        // Industry filter - filter by healthcare's industry
        // if ($request->filled('industry')) {
        //     $query->whereHas('healthcare.industry', function($q) use ($request) {
        //         $q->where('name', $request->industry);
        //     });
        // }
        // Industry filter - filter by direct industry relationship
        if ($request->filled('industry')) {
            $query->whereHas('industries', function($q) use ($request) {
                $q->where('name', $request->industry);
            });
        }

        // Work From (Location/State) filter
        if ($request->filled('workFrom')) {
            $query->whereHas('jobWorkFroms', fn($q) => $q->where('name', $request->workFrom));
        }

        // Licensed In filter
        if ($request->filled('licensedIn')) {
            $query->whereHas('jobLicensedIns', fn($q) => $q->where('name', $request->licensedIn));
        }

        // Licensed Type filter
        if ($request->filled('licensedType')) {
            $query->where('license_type', $request->licensedType);
        }

        // Healthcare specialty filters - filtering through healthcare relationship
        if ($request->filled('rn')) {
            $query->whereHas('healthcare', function($q) use ($request) {
                $q->whereJsonContains('rn', ['name' => $request->rn]);
            });
        }

        if ($request->filled('physician')) {
            $query->whereHas('healthcare', function($q) use ($request) {
                $q->whereJsonContains('physician', ['name' => $request->physician]);
            });
        }

        if ($request->filled('allied_health')) {
            $query->whereHas('healthcare', function($q) use ($request) {
                $q->whereJsonContains('allied_health', ['name' => $request->allied_health]);
            });
        }

        if ($request->filled('administrator')) {
            $query->whereHas('healthcare', function($q) use ($request) {
                $q->where('administrator', $request->administrator);
            });
        }

        // Healthcare ID filter
        if ($request->filled('healthcareId')) {
            $query->where('healthcare_id', $request->healthcareId);
        }

        $jobs = $query->latest()->simplePaginate(10)->through(function ($job) use ($userId) {
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
                'can_apply' => !$isOwner, 
                
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
            'licensedTypes' => LicensedType::orderBy('id')
                ->pluck('name'),
            'healthcares' => Healthcare::select(['id', 'name', 'rn', 'physician', 'allied_health', 'administrator'])->get(),
        ]);
    }
}