<?php

namespace App\Http\Controllers;

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

        return inertia('Welcome', [
            'navigations' => $navigations,
        ]);
    }
}
