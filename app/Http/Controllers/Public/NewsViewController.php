<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsViewController extends Controller
{
    public function index()
    {
        $news = News::where('is_active', true)
            ->latest()
            ->paginate(6);

        return Inertia::render('Public/News/Index', [
            'news' => $news,
        ]);
    }

    public function show($slug)
    {
        $item = News::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Public/News/Show', [
            'news' => $item,
        ]);
    }
}
