<?php

use App\Http\Controllers\DiemGDController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NhanVienController;
use Illuminate\Http\Request;
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

//login
Route::post("auth/login",[LoginController::class,'login'])->name("login");
Route::apiResource("diemgd",DiemGDController::class)->middleware('auth:api');
// Route::get("user",[NhanVienController::class,'index'])->middleware('auth:api');