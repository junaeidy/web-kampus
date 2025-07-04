<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HomeSectionController extends Controller
{
    /**
     * Display a listing of the home sections.
     */
    public function index()
    {
        $sections = HomeSection::with('contents')
            ->orderBy('order')
            ->get();

        $sections->each(function ($section) {
            $section->contents->each(function ($content) {
                if ($content->image && !filter_var($content->image, FILTER_VALIDATE_URL)) {
                    $content->image_url = Storage::url($content->image);
                } else {
                    $content->image_url = $content->image;
                }
            });
        });

        return Inertia::render('Admin/HomeSections/Index', [
            'sections' => $sections,
            'message' => session('message'),
        ]);
    }

    /**
     * Show the form for creating a new home section.
     */
    public function create()
    {
        return Inertia::render('Admin/HomeSections/Create');
    }

    /**
     * Store a newly created home section in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'section_type' => ['required', 'string', 'in:hero,about,gallery,announcement,call_to_action'],
            'order' => ['required', 'integer', 'unique:home_sections,order'],
            'multiple_content' => ['boolean'],
            'is_visible' => ['boolean'],
            'contents' => ['required', 'array'],
            'contents.*.headline' => ['nullable', 'string', 'max:255'],
            'contents.*.description' => ['nullable', 'string'],
            'contents.*.image' => ['nullable', 'file', 'image', 'max:2048'],
            'contents.*.title' => ['nullable', 'string', 'max:255'],
            'contents.*.button_text' => ['nullable', 'string', 'max:255'],
            'contents.*.cta_link' => ['nullable', 'url', 'max:255'],
        ]);

        DB::transaction(function () use ($request) {
            $homeSection = HomeSection::create([
                'section_type' => $request->section_type,
                'order' => $request->order,
                'multiple_content' => $request->multiple_content,
                'is_visible' => $request->is_visible ?? true,
            ]);

            foreach ($request->contents as $contentData) {
                $imagePath = null;

                if (isset($contentData['image']) && $contentData['image'] instanceof \Illuminate\Http\UploadedFile) {
                    $imagePath = $contentData['image']->store('images/sections', 'public');
                }

                $homeSection->contents()->create([
                    'headline' => $contentData['headline'] ?? null,
                    'description' => $contentData['description'] ?? null,
                    'image' => $imagePath,
                    'title' => $contentData['title'] ?? null,
                    'button_text' => $contentData['button_text'] ?? null,
                    'cta_link' => $contentData['cta_link'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.home.sections.index')->with('success', 'Bagian beranda berhasil ditambahkan!');
    }


    /**
     * Show the form for editing the specified home section.
     */
    public function edit(HomeSection $homeSection)
    {
        $homeSection->load('contents');

        $homeSection->contents->each(function ($content) {
            if ($content->image && !filter_var($content->image, FILTER_VALIDATE_URL)) {
                $content->image_url = Storage::url($content->image);
            } else {
                $content->image_url = $content->image;
            }
        });

        return Inertia::render('Admin/HomeSections/Edit', [
            'homeSection' => $homeSection,
        ]);
    }

    /**
     * Update the specified home section in storage.
     */
    public function update(Request $request, HomeSection $homeSection)
    {

        $request->validate([
            'section_type' => ['required', 'string', 'in:hero,about,gallery,announcement,call_to_action'],
            'order' => [
                'required',
                'integer',
                \Illuminate\Validation\Rule::unique('home_sections', 'order')->ignore($homeSection->id),
            ],
            'multiple_content' => ['boolean'],
            'is_visible' => ['boolean'],
            'contents' => ['required', 'array'],
            'contents.*.id' => ['nullable', 'integer', 'exists:home_section_contents,id'],
            'contents.*.headline' => ['nullable', 'string', 'max:255'],
            'contents.*.description' => ['nullable', 'string'],
            'contents.*.image' => ['nullable', 'file', 'image', 'max:2048'],
            'contents.*.title' => ['nullable', 'string', 'max:255'],
            'contents.*.button_text' => ['nullable', 'string', 'max:255'],
            'contents.*.cta_link' => ['nullable', 'url', 'max:255'],
        ]);

        DB::transaction(function () use ($request, $homeSection) {
            $homeSection->update([
                'section_type' => $request->section_type,
                'order' => $request->order,
                'multiple_content' => $request->multiple_content,
                'is_visible' => $request->is_visible ?? true,
            ]);

            $existingContents = $homeSection->contents->keyBy('id');
            $contentsToKeepIds = [];

            foreach ($request->contents as $contentData) {
                $contentId = $contentData['id'] ?? null;
                $imagePath = null;

                if (isset($contentData['image']) && $contentData['image'] instanceof \Illuminate\Http\UploadedFile) {
                    if ($contentId && isset($existingContents[$contentId]) && $existingContents[$contentId]->image) {
                        Storage::delete($existingContents[$contentId]->image);
                    }
                    $imagePath = $contentData['image']->store('images/sections', 'public');
                } elseif ($contentId && isset($existingContents[$contentId])) {
                    $imagePath = $existingContents[$contentId]->image;
                }

                if (array_key_exists('image', $contentData) && $contentData['image'] === null) {
                    if ($contentId && isset($existingContents[$contentId]) && $existingContents[$contentId]->image) {
                        Storage::delete($existingContents[$contentId]->image);
                    }
                    $imagePath = null;
                }



                if ($contentId && isset($existingContents[$contentId])) {
                    $homeSection->contents()->where('id', $contentId)->update([
                        'headline' => $contentData['headline'] ?? null,
                        'description' => $contentData['description'] ?? null,
                        'image' => $imagePath,
                        'title' => $contentData['title'] ?? null,
                        'button_text' => $contentData['button_text'] ?? null,
                        'cta_link' => $contentData['cta_link'] ?? null,
                    ]);
                    $contentsToKeepIds[] = $contentId;
                } else {
                    $homeSection->contents()->create([
                        'headline' => $contentData['headline'] ?? null,
                        'description' => $contentData['description'] ?? null,
                        'image' => $imagePath,
                        'title' => $contentData['title'] ?? null,
                        'button_text' => $contentData['button_text'] ?? null,
                        'cta_link' => $contentData['cta_link'] ?? null,
                    ]);
                }
            }

            $contentsToDelete = $homeSection->contents->whereNotIn('id', $contentsToKeepIds);
            foreach ($contentsToDelete as $content) {
                if ($content->image) {
                    Storage::delete($content->image);
                }
                $content->delete();
            }
        });

        return redirect()->route('admin.home.sections.index')->with('success', 'Bagian beranda berhasil diperbarui!');
    }

    /**
     * Remove the specified home section from storage.
     */
    public function destroy(HomeSection $homeSection)
    {
        DB::transaction(function () use ($homeSection) {
            foreach ($homeSection->contents as $content) {
                if ($content->image) {
                    Storage::delete($content->image);
                }
            }
            $homeSection->delete();
        });

        return redirect()->route('admin.home.sections.index')->with('success', 'Bagian beranda berhasil dihapus!');
    }
}
