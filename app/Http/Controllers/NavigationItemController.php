<?php

namespace App\Http\Controllers;

use App\Models\NavigationItem;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NavigationItemController extends Controller
{
    public function index()
    {
        $navigations = NavigationItem::with(['page', 'children.page'])
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get();

        $pages = Page::select('id', 'title')->get();

        return inertia('Admin/Navigation/Index', [
            'navigations' => $navigations,
            'pages' => $pages,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $data['page_id'] = $data['page_id'] ?: null;
        $data['parent_id'] = $data['parent_id'] ?: null;

        $validated = validator($data, [
            'label' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'page_id' => 'nullable|exists:pages,id',
            'parent_id' => 'nullable|exists:navigation_items,id',
        ])->validate();

        NavigationItem::create($validated);

        return back()->with('success', 'Menu berhasil ditambahkan.');
    }


    public function update(Request $request, NavigationItem $navigation)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'page_id' => 'nullable|exists:pages,id',
            'parent_id' => 'nullable|exists:navigation_items,id',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $navigation->update($validated);

        return back()->with('success', 'Menu berhasil diperbarui.');
    }



    public function destroy(NavigationItem $navigation)
    {
        $navigation->delete();
        return back()->with('success', 'Menu berhasil dihapus.');
    }
}
