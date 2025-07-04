<?php

namespace App\Http\Controllers\Admin;

use App\Models\News;
use App\Models\Page;
use Inertia\Inertia;
use App\Models\Faculty;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'fakultas' => Faculty::count(),
                'dosen' => Lecturer::count(),
                'berita' => News::count(),
                'halaman' => Page::where('is_active', true)->count(),
            ],
            'latest_news' => News::latest()->take(5)->get(['id', 'title', 'created_at']),
        ]);
    }
}
