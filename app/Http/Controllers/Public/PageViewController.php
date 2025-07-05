<?php

namespace App\Http\Controllers\Public;

use App\Models\News;
use App\Models\Page;
use Inertia\Inertia;
use App\Models\Faculty;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use App\Models\NavigationItem;
use App\Http\Controllers\Controller;

class PageViewController extends Controller
{

public function show($slug)
{
    $page = Page::where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();

    $navigations = NavigationItem::with(['page', 'children.page'])
        ->whereNull('parent_id')
        ->orderBy('order')
        ->get();

    $pages = Page::select('id', 'title', 'slug')->get();

    $faculties = Faculty::orderBy('name')->get();

    $recentNews = News::where('is_active', true)
        ->latest()
        ->take(3)
        ->get()
        ->map(fn($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'content' => $item->content,
            'date' => $item->created_at->format('Y-m-d'),
            'img' => $item->thumbnail_url,
            'url' => route('public.news.show', $item->slug),
        ]);

    $data = [
        'page' => $page,
        'navigations' => $navigations,
        'pages' => $pages,
        'faculties' => $faculties->map(fn($faculty) => [
            'id' => $faculty->id,
            'name' => $faculty->name,
        ]),
        'recentNews' => $recentNews,
    ];

    if ($page->section_type === 'lecturers') {
        $data['lecturers'] = Lecturer::with('faculty')
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn($lecturer) => [
                'id' => $lecturer->id,
                'name' => $lecturer->name,
                'position' => $lecturer->position,
                'photo_path' => $lecturer->photo_path,
                'bio' => $lecturer->bio,
                'faculty' => $lecturer->faculty?->name,
            ]);
    }

    return Inertia::render('Public/Page', $data);
}
}