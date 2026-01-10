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
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'linkedin' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5048',
        ], [
            'name.required' => 'Please enter your name.',
            'name.string' => 'Name must be a valid text.',
            'name.max' => 'Name cannot exceed 255 characters.',
            'linkedin.url' => 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username).',
            'linkedin.max' => 'LinkedIn URL is too long.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'Image must be JPEG, PNG, JPG, GIF, or WebP format.',
            'image.max' => 'Image size cannot exceed 5MB.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('error', [
                'scope' => 'profile',
                'message' => $validator->errors()->first(),
            ]);
        }

        $data = [
            'name' => $request->name,
            'linkedin' => $request->linkedin ?? null,
        ];

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($user->image && Storage::disk('public')->exists($user->image)) {
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

    // Upload Resume
    public function uploadResume(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ], [
            'resume.required' => 'Please select a resume file to upload.',
            'resume.file' => 'The uploaded file is invalid.',
            'resume.mimes' => 'Resume must be a PDF, DOC, or DOCX file.',
            'resume.max' => 'Resume size cannot exceed 2MB.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with('error', [
                'scope' => 'resume',
                'message' => $validator->errors()->first(),
            ]);
        }

        try {
            if ($user->resume_path && Storage::disk('public')->exists($user->resume_path)) {
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
            return redirect()->back()->with('error', [
                'scope' => 'resume',
                'message' => 'Something went wrong. Please try again.',
            ]);
        }
    }
}