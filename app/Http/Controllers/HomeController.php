<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use App\Models\NavigationItem;

class HomeController extends Controller
{
    public function index()
    {
        $navigations = NavigationItem::with(['page', 'children.page'])
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $sections = HomeSection::where('is_visible', true)
            ->orderBy('order')
            ->get();

        $news = News::latest()->take(3)->get();

        return inertia('Welcome', [
            'navigations' => $navigations,
            'sections' => $sections,
            'news' => $news,
        ]);
    }
}
