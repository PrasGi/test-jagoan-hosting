<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\HousePaymentHistoryController;
use App\Http\Controllers\HouseResidentHistoryController;
use App\Http\Controllers\ResidentController;
use App\Models\HousePaymentHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/residents', [ResidentController::class, 'index']);
    Route::post('/residents', [ResidentController::class, 'store']);
    Route::get('/residents/{resident}', [ResidentController::class, 'show']);
    Route::put('/residents/{resident}', [ResidentController::class, 'update']);
    Route::delete('/residents/{resident}', [ResidentController::class, 'destroy']);

    Route::get('/houses', [HouseController::class, 'index']);
    Route::post('/houses', [HouseController::class, 'store']);
    Route::get('/houses/{house}', [HouseController::class, 'show']);
    Route::put('/houses/{house}', [HouseController::class, 'update']);
    Route::delete('/houses/{house}', [HouseController::class, 'destroy']);

    Route::get('/house-resident-histories', [HouseResidentHistoryController::class, 'index']);
    Route::post('/house-resident-histories', [HouseResidentHistoryController::class, 'store']);
    Route::get('/house-resident-histories/{houseResidentHistory}', [HouseResidentHistoryController::class, 'show']);
    // Route::put('/house-resident-histories/{houseResidentHistory}', [HouseResidentHistoryController::class, 'update']);
    // Route::delete('/house-resident-histories/{houseResidentHistory}', [HouseResidentHistoryController::class, 'destroy']);

    Route::get('/house-payment-histories', [HousePaymentHistoryController::class, 'index']);
    Route::post('/house-payment-histories', [HousePaymentHistoryController::class, 'store']);
    Route::get('/house-payment-histories/{housePaymentHistory}', [HousePaymentHistoryController::class, 'show']);
    // Route::put('/house-payment-histories/{housePaymentHistory}', [HousePaymentHistoryController::class, 'update']);
    // Route::delete('/house-payment-histories/{housePaymentHistory}', [HousePaymentHistoryController::class, 'destroy']);
    Route::put('/house-payment-histories/change-status/{housePaymentHistory}', [HousePaymentHistoryController::class, 'changeStatus']);

    Route::get('/house-payment-histories/report/sumary', [HousePaymentHistoryController::class, 'yearlySummaryReport']);
    Route::get('/house-payment-histories/report/detail', [HousePaymentHistoryController::class, 'monthlyDetailReport']);
});

// Unauthorized

Route::get('/unauthorized', function () {
    return response()->json([
        'status_code' => 401,
        'message' => 'Unauthorized'
    ], 401);
})->name('unauthorized');
