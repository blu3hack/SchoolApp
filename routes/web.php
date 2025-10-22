<?php

use Inertia\Inertia;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\EbookController;
use App\Http\Controllers\DrawingController;
use App\Http\Controllers\indexDBController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AddPanelController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\annotationController;
use App\Http\Controllers\ClassEbookController;
use App\Http\Controllers\UserImportController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\api\APIController;
use App\Http\Controllers\TokensImportController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// =================================================> Session Management System <===========================================================

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// =================================================> Routing Untuk Universal LOGIN <===========================================================

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/whiteboard', fn () => Inertia::render('Whiteboard'))->name('whiteboard');
});

// =================================================> Routing Untuk Role Siswa <===========================================================

// midleware untuk Siswa
Route::middleware(['auth', 'role:Siswa'])->group(function () {
    Route::get('/ClassEbook', [ClassEbookController::class, 'ClassEbook'])->name('class-ebook');
    Route::post('/ClassEbook', [ClassEbookController::class, 'sendtoken'])->name('sendtoken');
    Route::get('/drawings', [DrawingController::class, 'index']);
    Route::post('/drawings', [DrawingController::class, 'store']);
    Route::put('/drawings/{drawing}', [DrawingController::class, 'update']); // opsional
    Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
    Route::get('/annotation', [annotationController::class, 'index']);
    Route::get('/flipbook', function (Request $request) {
        return Inertia::render('FlipbookPage', $request->query());
    });
});

// =================================================> Routing Untuk Role Admin <===========================================================

// Route midleware untuk admin
Route::middleware(['auth', 'role:Admin, AdminSD, AdminSMP'])->group(function () {
    Route::get('/add-token', [TokensImportController::class, 'tokens'])->name('add-tokens');
    Route::get('/manage-token', [TokensImportController::class, 'manage'])->name('manage-token');
    Route::post('/add-tokens', [TokensImportController::class, 'store'])->name('tokens-store');
    Route::post('/import-token', [TokensImportController::class, 'import'])->name('tokens.import');
    Route::delete('/tokens/{id}', [TokensImportController::class, 'deleteUsers'])->name('tokens.delete');
    Route::put('/tokens/{id}', [TokensImportController::class, 'update'])->name('tokens.update');
    Route::delete('/users', [TokensImportController::class, 'deleteUsers'])->name('users.delete.multiple');
    Route::post('/users/import', [UserImportController::class, 'import'])->name('users.import');
    Route::post('/users/store', [UserImportController::class, 'store'])->name('users.store');
    Route::get('/add-user', [UserImportController::class, 'users'])->name('add-users');
    Route::get('/manage-user', [UserImportController::class, 'manage'])->name('manage-user');
    Route::post('/add-user', [UserImportController::class, 'users'])->name('add-users');
    Route::put('/users/{id}', [UserImportController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserImportController::class, 'deleteUsers'])->name('users.delete');
    Route::delete('/users', [UserImportController::class, 'deleteUsers'])->name('users.delete.multiple');
    Route::get('/add-ebook', [EbookController::class, 'ebooks'])->name('add-ebook');
    Route::post('/ebooks/store', [EbookController::class, 'store'])->name('ebooks-store');
    Route::delete('/ebooks/{id}', [EbookController::class, 'deleteUsers'])->name('ebooks.delete');

    Route::get('/add-panel', [AddPanelController::class, 'panels'])->name('add-panels');
    Route::post('/panels/store', [AddPanelController::class, 'store'])->name('panels-store');
    Route::delete('/panels/{id}', [AddPanelController::class, 'deleteUsers'])->name('panels.delete');
});

Route::get('/insertDB', [indexDBController::class, 'insertDB']);
Route::get('/indexdb', [indexDBController::class, 'index']);
Route::get('/test', [indexDBController::class, 'index']);

Route::get('/off', function () {
    return inertia('offlinepdf');
});

Route::get('/api/token', [APIController::class, 'index'])->name('api.token');


require __DIR__.'/auth.php';
