<?php

use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\DepartamentosTrabajadoresController;
use App\Http\Controllers\TipoSolicitudController;

Route::resource('solicitud', SolicitudController::class);

Route::get('api/getDepartamentos', [DepartamentosController::class, 'index']);
Route::get('api/getTipos', [TipoSolicitudController::class, 'index']);

Route::post('api/getSolicitudPDF', [SolicitudController::class, 'getSolicitudPDF']);

Route::get('/api/getTrabajadoresDepartamento/{id_departamento}', [DepartamentosTrabajadoresController::class, 'filter'])->name('trabajadores.departamento');

//codigo de login
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
