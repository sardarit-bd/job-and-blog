<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\CompanyAboutController;
use App\Http\Controllers\UploadResumeController;
use App\Http\Controllers\JobApplicationController;

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

});


Route::get('/', HomeController::class)->name('home');
Route::get('/job/{slug}', JobDetailController::class)->name('job-detail');
Route::get('/company/{id}', [CompanyAboutController::class, 'show'])->name('company-about');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

    $stats = [
        'totalApplications' => $user->jobApplications()->count(),
        'pending' => $user->jobApplications()->where('status', 'pending')->count(),
        'interviews' => $user->jobApplications()->where('status', 'interview')->count(),
        'rejected' => $user->jobApplications()->where('status', 'rejected')->count(),
        'accepted' => $user->jobApplications()->where('status', 'accepted')->count(),
    ];

    return Inertia::render('front/Dashboard', [
        'stats' => $stats
    ]);
    })->name('dashboard');

    Route::get('/resume', function (Request $request) {
        return Inertia::render('front/ResumeUpload', [
        'resume_path' => $request->user()->resume_path,
    ]);
    })->name('resume');
    Route::post('/resume/upload', [UploadResumeController::class, 'uploadResume'])->name('resume.upload');

    Route::post('/jobs/{job}/apply', [JobApplicationController::class, 'store'])
        ->name('jobs.apply');

    Route::get('/jobs/{job}/applied-status', [JobApplicationController::class, 'appliedStatus'])
    ->name('jobs.applied-status');
});

require __DIR__.'/settings.php';
