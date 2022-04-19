<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $array = [
            'user_name' => $request->user_name,
            'password' => $request->password,
            'user_status' => 1
        ];
        if (Auth::attempt($array)) {
            $user = Auth::user();
            $tokenResult = $user->createToken('your-password');
            $nhanvien = NhanVien::where("user_name",$user->user_name)->get();
            return response()->json([
                "data" => [
                    'token' => $tokenResult->accessToken,
                    'user' => $nhanvien[0],
                ]
            ]);
        } else {
            return response()->json([
                "error" => 'Thông tin đăng nhập không đúng. Vui lòng thử lại!'
            ],234);    
        }
    }
    public function logout(Request $request)
    {
        $request->user()->token()->delete();
    }
}
