<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DealerController;
use App\Http\Controllers\Api\DealerDashboardController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\DealerWebsiteController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\EmailSettingsController;
use App\Http\Controllers\Api\WhatsappSettingsController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\PromoCodeController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\InboxController;
use App\Http\Controllers\Api\PublicStatsController;
use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminDealerController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminAnalyticsController;
use App\Http\Controllers\Api\Admin\AdminSettingsController;
use App\Http\Controllers\Api\Admin\AdminDomainController;
use App\Http\Controllers\Api\Admin\AdminBillingController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\Admin\AdminContentController;
use App\Http\Controllers\Api\SupportController;
use App\Http\Controllers\Api\Admin\AdminSupportController;
use App\Http\Controllers\Api\DealerPaymentController;
use App\Http\Controllers\Api\PaymentCheckoutController;
use App\Http\Controllers\Api\DealerSubscriptionController;

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

// Public — plans for the pricing page
Route::get('/plans', [SubscriptionController::class, 'plans']);

// Public — platform stats for the marketing home page
Route::get('/stats', [PublicStatsController::class, 'index']);

// Public — marketing site content
Route::get('/faqs', [ContentController::class, 'faqs']);
Route::get('/testimonials', [ContentController::class, 'testimonials']);

/*
|--------------------------------------------------------------------------
| Public Marketplace
|--------------------------------------------------------------------------
*/
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);

Route::get('/dealers', [DealerController::class, 'index']);
Route::get('/dealers/{dealer}', [DealerController::class, 'show']);

// Public — start a Stripe deposit checkout for a vehicle
Route::post('/vehicles/{vehicle}/checkout', [PaymentCheckoutController::class, 'create']);
Route::get('/checkout/confirm', [PaymentCheckoutController::class, 'confirm']);

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/leads', [LeadController::class, 'store']);

// Public — website chat widget
Route::post('/inbox/start', [InboxController::class, 'start']);
Route::post('/inbox/{token}/send', [InboxController::class, 'send']);
Route::get('/inbox/{token}/messages', [InboxController::class, 'poll']);

// Public — custom domain + dealer website
Route::get('/sites/resolve-domain', [DealerWebsiteController::class, 'resolveDomain']);
Route::get('/sites/{slug}', [DealerWebsiteController::class, 'showBySlug']);

/*
|--------------------------------------------------------------------------
| Admin Panel
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {

    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware(['auth:sanctum', \App\Http\Middleware\EnsureAdmin::class])->group(function () {

        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        Route::get('/analytics', [AdminAnalyticsController::class, 'index']);

        Route::get('/dealers', [AdminDealerController::class, 'index']);
        Route::get('/dealers/{dealer}', [AdminDealerController::class, 'show']);
        Route::patch('/dealers/{dealer}/status', [AdminDealerController::class, 'updateStatus']);

        Route::get('/domains', [AdminDomainController::class, 'index']);
        Route::delete('/domains/{dealer}', [AdminDomainController::class, 'remove']);

        Route::get('/support', [AdminSupportController::class, 'index']);
        Route::get('/support/{ticket}', [AdminSupportController::class, 'show']);
        Route::post('/support/{ticket}/reply', [AdminSupportController::class, 'reply']);
        Route::patch('/support/{ticket}/status', [AdminSupportController::class, 'updateStatus']);

        Route::middleware(\App\Http\Middleware\EnsureSuperAdmin::class)->group(function () {

            Route::get('/users', [AdminUserController::class, 'index']);
            Route::post('/users', [AdminUserController::class, 'store']);
            Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole']);
            Route::patch('/users/{user}/status', [AdminUserController::class, 'updateStatus']);
            Route::delete('/users/{user}', [AdminUserController::class, 'destroy']);

            Route::get('/settings', [AdminSettingsController::class, 'index']);
            Route::patch('/settings', [AdminSettingsController::class, 'update']);

            Route::get('/billing', [AdminBillingController::class, 'index']);

            Route::get('/faqs', [AdminContentController::class, 'faqs']);
            Route::post('/faqs', [AdminContentController::class, 'storeFaq']);
            Route::patch('/faqs/{faq}', [AdminContentController::class, 'updateFaq']);
            Route::delete('/faqs/{faq}', [AdminContentController::class, 'deleteFaq']);

            Route::get('/testimonials', [AdminContentController::class, 'testimonials']);
            Route::post('/testimonials', [AdminContentController::class, 'storeTestimonial']);
            Route::patch('/testimonials/{testimonial}', [AdminContentController::class, 'updateTestimonial']);
            Route::delete('/testimonials/{testimonial}', [AdminContentController::class, 'deleteTestimonial']);
        });
    });
});

/*
|--------------------------------------------------------------------------
| Protected Routes (dealers)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::get('/my-dealer', [DealerController::class, 'myDealer']);
    Route::post('/dealers', [DealerController::class, 'store']);
    Route::put('/dealers/{dealer}', [DealerController::class, 'update']);
    Route::patch('/dealers/{dealer}', [DealerController::class, 'update']);
    Route::delete('/dealers/{dealer}', [DealerController::class, 'destroy']);
    Route::post('/dealers/{dealer}/logo', [DealerController::class, 'uploadLogo']);
    Route::post('/dealers/{dealer}/cover', [DealerController::class, 'uploadCoverImage']);

    Route::get('/dealer/dashboard', [DealerDashboardController::class, 'index']);
    Route::get('/subscription', [SubscriptionController::class, 'status']);

    Route::get('/team', [TeamController::class, 'index']);
    Route::post('/team', [TeamController::class, 'store']);
    Route::patch('/team/{member}/role', [TeamController::class, 'updateRole']);
    Route::delete('/team/{member}', [TeamController::class, 'destroy']);

    Route::prefix('dealer')->group(function () {

        Route::get('/vehicles', [VehicleController::class, 'dealerVehicles']);
        Route::post('/vehicles', [VehicleController::class, 'store']);
        Route::get('/vehicles/{vehicle}', [VehicleController::class, 'edit']);
        Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update']);
        Route::patch('/vehicles/{vehicle}', [VehicleController::class, 'update']);
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy']);
        Route::post('/vehicles/{vehicle}/images', [VehicleController::class, 'uploadImages']);
        Route::delete('/vehicle-images/{image}', [VehicleController::class, 'deleteImage']);
        Route::post('/vehicles/{vehicle}/featured-image/{image}', [VehicleController::class, 'setFeaturedImage']);

        Route::get('/leads', [LeadController::class, 'dealerLeads']);
        Route::get('/leads/stats', [LeadController::class, 'stats']);
        Route::get('/leads/{lead}', [LeadController::class, 'show']);
        Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus']);
        Route::delete('/leads/{lead}', [LeadController::class, 'destroy']);

        Route::get('/website', [DealerWebsiteController::class, 'mySite']);
        Route::post('/website/upload', [DealerWebsiteController::class, 'uploadAsset']);
        Route::put('/website', [DealerWebsiteController::class, 'update']);
        Route::patch('/website/publish', [DealerWebsiteController::class, 'publish']);

        Route::get('/campaigns', [CampaignController::class, 'index']);
        Route::post('/campaigns', [CampaignController::class, 'store']);
        Route::post('/campaigns/whatsapp', [CampaignController::class, 'whatsapp']);

        Route::get('/email-settings', [EmailSettingsController::class, 'show']);
        Route::put('/email-settings', [EmailSettingsController::class, 'update']);
        Route::post('/email-settings/test', [EmailSettingsController::class, 'test']);

        Route::get('/whatsapp-settings', [WhatsappSettingsController::class, 'show']);
        Route::put('/whatsapp-settings', [WhatsappSettingsController::class, 'update']);
        Route::post('/whatsapp-settings/test', [WhatsappSettingsController::class, 'test']);

        Route::get('/templates', [TemplateController::class, 'index']);
        Route::post('/templates', [TemplateController::class, 'store']);
        Route::delete('/templates/{template}', [TemplateController::class, 'destroy']);

        Route::get('/contacts', [ContactController::class, 'index']);
        Route::post('/contacts/import', [ContactController::class, 'import']);
        Route::delete('/contacts/clear', [ContactController::class, 'clear']);
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

        Route::get('/promo-codes', [PromoCodeController::class, 'index']);
        Route::post('/promo-codes', [PromoCodeController::class, 'store']);
        Route::patch('/promo-codes/{promoCode}/toggle', [PromoCodeController::class, 'toggle']);
        Route::delete('/promo-codes/{promoCode}', [PromoCodeController::class, 'destroy']);

        Route::get('/analytics', [AnalyticsController::class, 'overview']);
        Route::put('/settings', [DealerController::class, 'updateSettings']);

        Route::get('/inbox', [InboxController::class, 'index']);
        Route::get('/inbox/{conversation}', [InboxController::class, 'show']);
        Route::post('/inbox/{conversation}/reply', [InboxController::class, 'reply']);
        Route::patch('/inbox/{conversation}/toggle', [InboxController::class, 'toggle']);

        Route::get('/support', [SupportController::class, 'index']);
        Route::post('/support', [SupportController::class, 'store']);
        Route::get('/support/{ticket}', [SupportController::class, 'show']);
        Route::post('/support/{ticket}/reply', [SupportController::class, 'reply']);

        // Payment gateway + transactions
        Route::get('/payment-settings', [DealerPaymentController::class, 'show']);
        Route::put('/payment-settings', [DealerPaymentController::class, 'update']);
        Route::get('/transactions', [DealerPaymentController::class, 'transactions']);

        // Subscription billing (dealer pays platform)
        Route::post('/subscription/checkout', [DealerSubscriptionController::class, 'checkout']);
        Route::get('/subscription/confirm', [DealerSubscriptionController::class, 'confirm']);
    });
});