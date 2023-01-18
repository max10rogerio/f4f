<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResendVerificationCodeController;
use App\Http\Controllers\Auth\VerifyRegistrationCodeController;
use App\Http\Controllers\Users\CurrentUserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
    Route::post('/verify-code', VerifyRegistrationCodeController::class);
    Route::post('/resend-code', ResendVerificationCodeController::class);
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', CurrentUserController::class);
});

Route::get('/test', function () {
    $user = User::factory()->create([
        'name' => 'John Doe',
        'email' => 'max.rogerio@f4f.com',
        'password' => Hash::make('123456789'),
    ]);

    return $user;
});
