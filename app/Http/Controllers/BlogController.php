<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogHero;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 6;
        
        $query = Blog::with(['category', 'user'])
            ->latest('created_at');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $blogs = $query->paginate($perPage);

        // Transform blogs data
        $blogsData = $blogs->getCollection()->map(function ($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'excerpt' => $this->getExcerpt($blog->description),
                'description' => $blog->description,
                'category' => $blog->category->name,
                'category_id' => $blog->category_id,
                'author' => $blog->user->name,
                'date' => $blog->created_at->format('M d, Y'),
                'readTime' => $blog->reading_time . ' min read',
                'image' => $blog->image ? asset('storage/' . $blog->image) : 'https://images.unsplash.com/photo-1499750310159-5254f4cc1575?auto=format&fit=crop&q=80&w=1000',
                'color' => $this->getCategoryColor($blog->category->name),
            ];
        });

        // Get all categories for filter dropdown
        $categories = Category::select('id', 'name')->get();

        // Get active hero
        $hero = BlogHero::getActive();
        $heroData = $hero ? [
            'title' => $hero->title,
            'moto' => $hero->moto,
            'image' => $hero->image ? asset('storage/' . $hero->image) : null,
        ] : null;

        return Inertia::render('Blog', [
            'blogs' => $blogsData,
            'categories' => $categories,
            'heroData' => $heroData,
            'pagination' => [
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'per_page' => $blogs->perPage(),
                'total' => $blogs->total(),
                'has_more' => $blogs->hasMorePages(),
            ],
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
            ],
        ]);
    }

    public function show($slug)
    {
        $blog = Blog::with(['category', 'user'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('BlogDetail', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'description' => $blog->description,
                'category' => $blog->category->name,
                'author' => $blog->user->name,
                'date' => $blog->created_at->format('M d, Y'),
                'readTime' => $blog->reading_time . ' min read',
                'image' => $blog->image ? asset('storage/' . $blog->image) : null,
            ],
        ]);
    }

    private function getExcerpt($html, $length = 150)
    {
        $text = strip_tags($html);
        if (strlen($text) > $length) {
            return substr($text, 0, $length) . '...';
        }
        return $text;
    }

    private function getCategoryColor($categoryName)
    {
        $colors = [
            'IT' => 'bg-purple-100 text-purple-600',
            'Healthcare' => 'bg-blue-100 text-blue-600',
            'Finance' => 'bg-green-100 text-green-600',
            'Legal' => 'bg-pink-100 text-pink-600',
            'Construction' => 'bg-orange-100 text-orange-600',
            'Misc' => 'bg-indigo-100 text-indigo-600',
        ];

        return $colors[$categoryName] ?? 'bg-gray-100 text-gray-600';
    }
}