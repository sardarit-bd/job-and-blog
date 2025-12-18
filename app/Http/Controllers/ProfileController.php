<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function edit()
    {
        $user = Auth::user();

        return Inertia::render('front/ResumeUpload', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'linkedin' => $user->linkedin ?? '',
                    'image' => $user->image ?? null,
                ],
            ],
            'resume_path' => $user->resume_path ?? null,
            'flash' => session('flash', []),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'linkedin' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = [
            'name' => $validated['name'],
            'linkedin' => $validated['linkedin'] ?? null,
        ];

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $path = $request->file('image')->store('profiles', 'public');
            $data['image'] = $path;
        }

        $user->update($data);

        return redirect()->back()->with('success', 'Profile updated successfully!');
    }

    public function uploadResume(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $user = Auth::user();

        if ($user->resume_path) {
            Storage::disk('public')->delete($user->resume_path);
        }

        $path = $request->file('resume')->store('resumes', 'public');
        $user->resume_path = $path;
        $user->save();

        return redirect()->back()->with('success', 'Resume uploaded successfully!');
    }
}