<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageViewController extends Controller
{
    public function show($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $data = [
            'page' => $page,
        ];

        if ($page->section_type === 'lecturers') {
            $data['lecturers'] = Lecturer::with('faculty')
                ->where('is_active', true)
                ->orderBy('name')
                ->get();
        }

        return Inertia::render('Public/Page', $data);
    }
}
