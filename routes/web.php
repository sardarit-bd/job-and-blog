<?php

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use Illuminate\Cache\RateLimiting\Limit;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\RateLimiter;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\CompanyAboutController;
use App\Http\Controllers\UploadResumeController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\JobApplicationController;

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');


    // blog
    Route::get('/blogs', function () {
        return Inertia::render('Blog');
    })->name('blogs');

    
    RateLimiter::for('forgot-password', function (Request $request) {
        return Limit::perMinute(5)->by($request->ip())
            ->response(function (Request $request) {
                return redirect()->back()
                    ->withInput($request->only('email'))
                    ->with('error', 'Too many password reset requests. Please try again in 1 minute.');
            });
    });


    // Forgot Password Routes
    Route::get('/forgot-password', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email')->middleware(['throttle:forgot-password']);

    // Reset Password Routes
    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');

});


Route::get('/', HomeController::class)->name('home');
Route::get('/job/{slug}', JobDetailController::class)->name('job-detail');
Route::get('/company/{id}', [CompanyAboutController::class, 'show'])->name('company-about');


// blog routes
Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

        // Base stats (as before)
        $stats = [
            'totalApplications' => $user->jobApplications()->count(),
            'pending' => $user->jobApplications()->where('status', 'pending')->count(),
            'interviews' => $user->jobApplications()->where('status', 'shortlisted')->count(),
            'rejected' => $user->jobApplications()->where('status', 'rejected')->count(),
            'accepted' => $user->jobApplications()->where('status', 'hired')->count(),
        ];

        // Monthly chart data – last 12 months
        $monthlyData = $user->jobApplications()
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN status = "hired" THEN 1 ELSE 0 END) as accepted_count')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(11)->startOfMonth())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $chartData = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i)->format('Y-m');
            $shortMonth = Carbon::now()->subMonths($i)->format('M'); // e.g., Jan, Feb

            $row = $monthlyData->firstWhere('month', $date);

            $chartData[] = [
                'month' => $shortMonth,
                'applications' => $row?->total ?? 0,
                'accepted' => $row?->accepted_count ?? 0,
            ];
        }

        return Inertia::render('front/Dashboard', [
            'auth' => [
                'user' => $user->only('name', 'email', 'image'),
            ],
            'stats' => $stats,
            'chartData' => $chartData, 
        ]);
    })->name('dashboard');

    // resume
    Route::get('/resume', function (Request $request) {
        return Inertia::render('front/ResumeUpload', [
        'resume_path' => $request->user()->resume_path,
    ]);
    })->name('resume');
    // Route::post('/resume/upload', [UploadResumeController::class, 'uploadResume'])->name('resume.upload');
    Route::post('/resume/upload', [ProfileController::class, 'uploadResume'])->name('resume.upload');


    // job application
    Route::post('/jobs/{job}/apply', [JobApplicationController::class, 'store'])
        ->name('jobs.apply');

    Route::get('/jobs/{job}/applied-status', [JobApplicationController::class, 'appliedStatus'])
    ->name('jobs.applied-status');


    // profile update
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/settings.php';
