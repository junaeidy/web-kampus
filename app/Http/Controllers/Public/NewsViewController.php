<?php

namespace App\Http\Controllers\Public;

use App\Models\News;
use App\Models\Page;
use Inertia\Inertia;
use App\Models\Faculty;
use Illuminate\Http\Request;
use App\Models\NavigationItem;
use App\Http\Controllers\Controller;

class NewsViewController extends Controller
{

    public function index(Request $request)
    {
        $query = News::where('is_active', true);

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%');
            });
        }

        $news = $query->latest()->paginate(6)->withQueryString();

        $navigations = NavigationItem::with(['page', 'children.page'])
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $pages = Page::select('id', 'title')->get();
        $faculties = Faculty::orderBy('name')->get();
        $recentNews = News::where('is_active', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/News/Index', [
            'news' => $news,
            'navigations' => $navigations,
            'pages' => $pages,
            'faculties' => $faculties->map(fn($faculty) => [
                'id' => $faculty->id,
                'name' => $faculty->name,
            ]),
            'recentNews' => $recentNews->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'content' => $item->content,
                'date' => $item->created_at->format('F d, Y'),
                'img' => $item->thumbnail_url,
                'url' => route('public.news.show', $item->slug),
            ]),
            'search' => $request->search,
        ]);
    }


    public function show($slug)
    {
        $item = News::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $navigations = NavigationItem::with(['page', 'children.page'])
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $pages = Page::select('id', 'title')->get();
        $faculties = Faculty::orderBy('name')->get();
        $recentNews = News::where('is_active', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Public/News/Show', [
            'news' => $item,
            'navigations' => $navigations,
            'pages' => $pages,
            'faculties' => $faculties->map(fn($faculty) => [
                'id' => $faculty->id,
                'name' => $faculty->name,
            ]),
            'recentNews' => $recentNews->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'content' => $item->content,
                'date' => $item->created_at->format('F d, Y'),
                'img' => $item->thumbnail_url,
                'url' => route('public.news.show', $item->slug),
            ]),
        ]);
    }
}
