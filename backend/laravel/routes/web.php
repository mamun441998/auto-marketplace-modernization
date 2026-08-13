<?php
use App\Http\Controllers\Api\TrackingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Email open / click tracking (public — hit by email clients & browsers)
Route::get('/track/open/{campaign}', [TrackingController::class, 'open']);
Route::get('/track/click/{campaign}', [TrackingController::class, 'click']);
