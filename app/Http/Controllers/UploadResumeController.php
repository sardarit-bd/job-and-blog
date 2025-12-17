<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadResumeController extends Controller
{
    public function uploadResume(Request $request)
    {
        $request->validate([
            'resume' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        $user = $request->user();

        // 1. Check if the user has an existing path in the database
        if ($user->resume_path) {
            // 2. Ensure we are looking at the correct disk
            if (Storage::disk('public')->exists($user->resume_path)) {
                Storage::disk('public')->delete($user->resume_path);
            }
        }

        // 3. Store the new file
        $path = $request->file('resume')->store('resumes', 'public');

        // 4. Update the database (Ensure 'resume_path' is in $fillable in User.php)
        $user->update([
            'resume_path' => $path
        ]);

        return back()->with('success', 'Resume updated!');
    }
}
