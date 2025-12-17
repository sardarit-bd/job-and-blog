<?php

use App\Http\Controllers\CompanyAboutController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\UploadResumeController;
use Illuminate\Http\Request;

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
        return Inertia::render('front/Dashboard');
    })->name('dashboard');

    Route::get('/resume', function (Request $request) {
        return Inertia::render('front/ResumeUpload', [
        'resume_path' => $request->user()->resume_path,
    ]);
    })->name('resume');
    Route::post('/resume/upload', [UploadResumeController::class, 'uploadResume'])->name('resume.upload');
});

require __DIR__.'/settings.php';
