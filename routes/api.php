<?php

use App\Http\Controllers\ChuyenHangController;
use App\Http\Controllers\DiemGDController;
use App\Http\Controllers\DonHangController;
use App\Http\Controllers\GiaoHangChiTietController;
use App\Http\Controllers\GiaoHangController;
use App\Http\Controllers\LichSuDonHangController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\PhieuXuatChiTietController;
use App\Http\Controllers\PhieuXuatController;
use App\Http\Controllers\UserColtroller;
use App\Models\GiaoHang;
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
Route::post("auth/logout",[LoginController::class,'logout'])->name("logout")->middleware('auth:api');
Route::post("auth/lock/{id}",[UserColtroller::class,'lockUser'])->middleware('auth:api');
Route::post("auth/unlock/{id}",[UserColtroller::class,'unLockUser'])->middleware('auth:api');

Route::apiResource("user",NhanVienController::class)->middleware('auth:api');
Route::apiResource("diemgd",DiemGDController::class)->middleware('auth:api');
Route::apiResource("donhang",DonHangController::class)->middleware('auth:api');
Route::apiResource("chuyenhang",ChuyenHangController::class)->middleware('auth:api');
Route::apiResource("phieuxuat",PhieuXuatController::class)->middleware('auth:api');
Route::apiResource("phieuxuatchitiet",PhieuXuatChiTietController::class)->only(['store'])->middleware('auth:api');
Route::apiResource("lichsudonhang",LichSuDonHangController::class)->only(['store'])->middleware('auth:api');
Route::apiResource("giaohang",GiaoHangController::class)->middleware('auth:api');
Route::apiResource("giaohangchitiet",GiaoHangChiTietController::class)->only(['store'])->middleware('auth:api');
