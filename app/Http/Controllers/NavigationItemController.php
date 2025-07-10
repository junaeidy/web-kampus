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
        $navigations = NavigationItem::withRecursiveChildren()
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

        return redirect()->route('admin.navigations.index')->with('success', 'Menu berhasil ditambahkan.');
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

        return redirect()->route('admin.navigations.index')->with('success', 'Menu berhasil diperbarui.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:navigation_items,id',
            'items.*.order' => 'required|integer',
            'items.*.parent_id' => 'nullable|exists:navigation_items,id',
        ]);

        foreach ($validated['items'] as $item) {
            NavigationItem::where('id', $item['id'])->update([
                'order' => $item['order'],
                'parent_id' => $item['parent_id'] ?? null,
            ]);
        }

        return redirect()->route('admin.navigations.index')->with('success', 'Navigasi berhasil diperbarui.');
    }


    public function destroy(NavigationItem $navigation)
    {
        $navigation->delete();
        return redirect()->route('admin.navigations.index')->with('success', 'Menu berhasil dihapus.');
    }
}
