<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\DealerDashboardController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\LeadController;

/*
|--------------------------------------------------------------------------
| Public Authentication
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::post('/email/verify', [AuthController::class, 'verifyEmail']);
Route::post('/email/resend', [AuthController::class, 'resendVerification']);

/*
|--------------------------------------------------------------------------
| Public Marketplace
|--------------------------------------------------------------------------
*/

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);

Route::get('/dealers', [DealerController::class, 'index']);
Route::get('/dealers/{dealer}', [DealerController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store']);

// Public — visitor submits a lead / inquiry
Route::post('/leads', [LeadController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Dealer Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/my-dealer', [DealerController::class, 'myDealer']);

    Route::post('/dealers', [DealerController::class, 'store']);

    Route::put('/dealers/{dealer}', [DealerController::class, 'update']);
    Route::patch('/dealers/{dealer}', [DealerController::class, 'update']);

    Route::delete('/dealers/{dealer}', [DealerController::class, 'destroy']);

    Route::post('/dealers/{dealer}/logo', [
        DealerController::class,
        'uploadLogo'
    ]);

    Route::post('/dealers/{dealer}/cover', [
        DealerController::class,
        'uploadCoverImage'
    ]);

    /*
    |--------------------------------------------------------------------------
    | Dealer Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dealer/dashboard', [
        DealerDashboardController::class,
        'index'
    ]);

    /*
    |--------------------------------------------------------------------------
    | Dealer (vehicles + leads)
    |--------------------------------------------------------------------------
    */

    Route::prefix('dealer')->group(function () {

        /* ---- Vehicles ---- */
        Route::get('/vehicles', [VehicleController::class, 'dealerVehicles']);
        Route::post('/vehicles', [VehicleController::class, 'store']);
        Route::get('/vehicles/{vehicle}', [VehicleController::class, 'edit']);
        Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update']);
        Route::patch('/vehicles/{vehicle}', [VehicleController::class, 'update']);
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy']);

        Route::post('/vehicles/{vehicle}/images', [VehicleController::class, 'uploadImages']);
        Route::delete('/vehicle-images/{image}', [VehicleController::class, 'deleteImage']);
        Route::post('/vehicles/{vehicle}/featured-image/{image}', [VehicleController::class, 'setFeaturedImage']);

        /* ---- Leads ----  (stats MUST come before {lead}) */
        Route::get('/leads', [LeadController::class, 'dealerLeads']);
        Route::get('/leads/stats', [LeadController::class, 'stats']);
        Route::get('/leads/{lead}', [LeadController::class, 'show']);
        Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus']);
        Route::delete('/leads/{lead}', [LeadController::class, 'destroy']);
    });
});