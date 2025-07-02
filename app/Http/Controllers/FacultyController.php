<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FacultyController extends Controller
{
    public function index(Request $request)
    {
        $faculties = Faculty::query()
            ->when($request->search, fn ($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Faculty/Index', [
            'faculties' => $faculties,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faculty/Create');
    }

    public function edit(Faculty $faculty)
    {
        return Inertia::render('Admin/Faculty/Edit', [
            'faculty' => $faculty,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        Faculty::create($data);
        return redirect()->route('admin.faculties.index')->with('success', 'Fakultas berhasil ditambahkan.');
    }

    public function update(Request $request, Faculty $faculty)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($faculty->logo_path) {
                Storage::disk('public')->delete($faculty->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        $faculty->update($data);
        return redirect()->route('admin.faculties.index')->with('success', 'Fakultas berhasil ditambahkan.');
    }

    public function destroy(Faculty $faculty)
    {
        if ($faculty->logo_path) {
            Storage::disk('public')->delete($faculty->logo_path);
        }

        $faculty->delete();
        return back()->with('success', 'Fakultas berhasil dihapus.');
    }
}