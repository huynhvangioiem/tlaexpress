<?php

namespace App\Http\Controllers;

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
            return response()->json([
                "success" => [
                    'token' => $tokenResult->accessToken,
                    'user' => $user->user_name,
                ]
            ]);
        } else {
            return response()->json([
                'error' => 'Unauthorised'
            ]);    
        }
    }
}
