<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use App\Models\User;
use Illuminate\Http\Request;

class UserColtroller extends Controller
{
    public function lockUser(Request $request, $id)
    {
        $nhanvien = NhanVien::find($id);
        $user = User::find($nhanvien->user_name);
        if (!$user) {
            return response()->json([
                'error' => "Không tìm thấy thông tin tài khoản cần khóa."
            ]);
        };
        $user->user_status = 0;
        $user->save();
    }
    public function unLockUser(Request $request, $id)
    {
        $nhanvien = NhanVien::find($id);
        $user = User::find($nhanvien->user_name);
        if (!$user) {
            return response()->json([
                'error' => "Không tìm thấy thông tin tài khoản cần mở khóa."
            ]);
        };
        $user->user_status = 1;
        $user->save();
    }
}
