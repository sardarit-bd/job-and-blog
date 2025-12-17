<?php

use App\Http\Controllers\CompanyAboutController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobDetailController;


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
});

require __DIR__.'/settings.php';
