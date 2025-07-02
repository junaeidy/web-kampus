<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LecturerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $lecturers = Lecturer::with('faculty')
            ->when(
                $search,
                fn($q) =>
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Lecturers/Index', [
            'lecturers' => $lecturers,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Lecturers/Create', [
            'faculties' => Faculty::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'is_active' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('lecturers', 'public');
            $validated['photo_path'] = $path;
        }

        Lecturer::create($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Dosen berhasil ditambahkan');
    }


    public function edit(Lecturer $lecturer)
    {
        return Inertia::render('Admin/Lecturers/Edit', [
            'lecturer' => $lecturer->load('faculty'),
            'faculties' => Faculty::all(),
        ]);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'is_active' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($lecturer->photo_path && Storage::disk('public')->exists($lecturer->photo_path)) {
                Storage::disk('public')->delete($lecturer->photo_path);
            }

            $path = $request->file('photo')->store('lecturers', 'public');
            $validated['photo_path'] = $path;
        }

        $lecturer->update($validated);

        return redirect()->route('admin.lecturers.index')->with('success', 'Dosen berhasil diperbarui');
    }


    public function destroy(Lecturer $lecturer)
    {
        if ($lecturer->photo_path) {
            Storage::delete($lecturer->photo_path);
        }

        $lecturer->delete();

        return redirect()->route('admin.lecturers.index')->with('success', 'Dosen berhasil dihapus.');
    }
}
