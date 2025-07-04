<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\NavigationItemController;
use App\Http\Controllers\Public\NewsViewController;
use App\Http\Controllers\Public\PageViewController;
use App\Http\Controllers\Admin\HomeSectionController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('admin.dashboard');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('pages', PageController::class);
    Route::resource('navigations', NavigationItemController::class);
    Route::get('navigations/sort', [NavigationItemController::class, 'sort'])->name('navigations.sort');
    Route::post('navigations/reorder', [NavigationItemController::class, 'reorder'])->name('navigations.reorder');
    Route::resource('faculties', FacultyController::class)->only([
        'index', 'store', 'update', 'destroy', 'create', 'edit'
    ]);
    Route::resource('lecturers', LecturerController::class);
    Route::get('/settings', [ProfileController::class, 'edit'])->name('settings.edit');
    Route::patch('/settings', [ProfileController::class, 'update'])->name('settings.update');
    Route::delete('/settings', [ProfileController::class, 'destroy'])->name('settings.destroy');
    Route::resource('news', NewsController::class);
    Route::get('/home-sections', [HomeSectionController::class, 'index'])->name('home.sections.index');
    Route::get('/home-sections/create', [HomeSectionController::class, 'create'])->name('home.sections.create');
    Route::post('/home-sections', [HomeSectionController::class, 'store'])->name('home.sections.store');
    Route::get('/home-sections/{homeSection}/edit', [HomeSectionController::class, 'edit'])->name('home.sections.edit');
    Route::put('/home-sections/{homeSection}', [HomeSectionController::class, 'update'])->name('home.sections.update');
    Route::delete('/home-sections/{homeSection}', [HomeSectionController::class, 'destroy'])->name('home.sections.destroy');
});

Route::post('/admin/upload-image', [UploadController::class, 'upload'])->name('admin.upload.image');
Route::get('/pages/{slug}', [PageViewController::class, 'show'])->name('pages.show');
Route::get('/news', [NewsViewController::class, 'index'])->name('public.news.index');
Route::get('/news/{slug}', [NewsViewController::class, 'show'])->name('public.news.show');

require __DIR__.'/auth.php';
