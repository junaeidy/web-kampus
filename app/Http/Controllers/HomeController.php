<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use App\Models\NavigationItem;
use App\Models\Faculty;

class HomeController extends Controller
{
    public function index()
    {
        $navigations = NavigationItem::with(['page', 'children.page'])
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $sections = HomeSection::with('contents')
            ->orderBy('order')
            ->get();

        $news = News::latest()->take(3)->get(); 
        $faculties = Faculty::orderBy('name')->get();

        return inertia('Welcome', [ 
            'navigations' => $navigations->map(function ($nav) {
                return [
                    'id' => $nav->id,
                    'label' => $nav->label,
                    'url' => $nav->url,
                    'page' => $nav->page ? [
                        'slug' => $nav->page->slug,
                    ] : null,
                    'children' => $nav->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'label' => $child->label,
                            'url' => $child->url,
                            'page' => $child->page ? [
                                'slug' => $child->page->slug,
                            ] : null,
                        ];
                    }),
                ];
            }),
            'sections' => $sections,
            'news' => $news->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'content' => $item->content,
                'date' => $item->created_at->format('F d, Y'),
                'img' => $item->thumbnail_url,
                'url' => route('public.news.show', $item->slug),
            ]),
            'faculties' => $faculties->map(fn($faculty) => [
                'id' => $faculty->id,
                'name' => $faculty->name,
            ]),
        ]);
    }
}