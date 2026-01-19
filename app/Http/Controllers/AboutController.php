<?php

namespace App\Http\Controllers;

use App\Models\About;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $about = About::getActive();
        
        $aboutData = $about ? [
            'title' => $about->title,
            'description' => $about->description,
            'image' => $about->image ? asset('storage/' . $about->image) : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
            'experience' => $about->experience,
            'x_link' => $about->x_link,
            'linkedin_link' => $about->linkedin_link,
        ] : null;

        return Inertia::render('About', [
            'aboutData' => $aboutData,
        ]);
    }
}