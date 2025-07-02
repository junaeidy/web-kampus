<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\NavigationItemController;
use App\Http\Controllers\Public\PageViewController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('admin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('pages', PageController::class);
    Route::resource('navigations', NavigationItemController::class);
    Route::get('navigations/sort', [NavigationItemController::class, 'sort'])->name('navigations.sort');
    Route::post('navigations/reorder', [NavigationItemController::class, 'reorder'])->name('navigations.reorder');
    Route::resource('faculties', FacultyController::class)->only([
        'index', 'store', 'update', 'destroy', 'create', 'edit'
    ]);
});

Route::post('/admin/upload-image', [UploadController::class, 'upload'])->name('admin.upload.image');
Route::get('/pages/{slug}', [PageViewController::class, 'show'])->name('pages.show');

require __DIR__.'/auth.php';
