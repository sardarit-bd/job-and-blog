<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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

    // profile update
    public function update(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'linkedin' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5048',
        ]);

        if ($validator->fails()) {
            // Generic error message
            return redirect()->back()->with('error', [
                'scope' => 'profile',
                'message' => 'Profile update failed. Please check your inputs and try again.',
            ]);
        }

        $data = [
            'name' => $request->name,
            'linkedin' => $request->linkedin ?? null,
        ];

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $path = $request->file('image')->store('profiles', 'public');
            $data['image'] = $path;
        }

        $user->update($data);

        return redirect()->back()->with('success', [
            'scope' => 'profile',
            'message' => 'Profile updated successfully!',
        ]);
    }


    // upload resume
    public function uploadResume(Request $request)
    {
        $user = Auth::user();

        try {
            $request->validate([
                'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
            ]);

            if ($user->resume_path) {
                Storage::disk('public')->delete($user->resume_path);
            }

            $path = $request->file('resume')->store('resumes', 'public');
            $user->resume_path = $path;
            $user->save();

            return redirect()->back()->with('success', [
                'scope' => 'resume',
                'message' => 'Resume uploaded successfully!',
            ]);
        } catch (\Exception $e) {
            // Scoped error
            return redirect()->back()->with('error', [
                'scope' => 'resume',
                'message' => 'Resume upload failed! ' . $e->getMessage(),
            ]);
        }
    }

}