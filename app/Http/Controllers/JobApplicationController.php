<?php

namespace App\Http\Controllers;

use App\Models\AllJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobApplicationController extends Controller
{
    public function store(Request $request, AllJob $job)
    {
        $user = $request->user();

        $alreadyApplied = $user->jobApplications()
            ->where('all_job_id', $job->id)
            ->exists();

        if ($alreadyApplied) {
            return redirect()->back()->with('error', 'You have already applied for this job.');
        }

        $user->jobApplications()->create([
            'all_job_id' => $job->id,
        ]);

        return redirect()->back()->with('success', 'Job applied successfully!');
    }

    public function appliedStatus(AllJob $job)
    {
        $user = Auth::user();

        $alreadyApplied = $user->jobApplications()
            ->where('all_job_id', $job->id)
            ->exists();

        return response()->json(['already_applied' => $alreadyApplied]);
    }
}
