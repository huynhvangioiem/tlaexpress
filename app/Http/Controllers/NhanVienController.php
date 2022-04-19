<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Validator;

class NhanVienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ralationship = array("user:user_status,user_name", "diemgd:dgd_ten,dgd_id");
        $nhanvien = NhanVien::with($ralationship)->get();
        return response()->json([
            "success" => $nhanvien
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'user_name' => 'required|max:10|unique:users',
                'password' => 'required',
                'nv_ten' => 'required|max:50',
                'nv_sdt' => 'required|max:10',
                'nv_ngaysinh' => 'required',
                'nv_chucvu' => 'required|max:1',
                'dgd_id' => 'required|max:1',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max',
                'unique' => ':attribute đã tồn tại',
            ],
            [
                'user_name' => 'Tên tài khoản',
                'password' => 'Mật khẩu',
                'nv_ten' => 'Tên nhân viên',
                'nv_sdt' => 'Số điện thoại',
                'nv_ngaysinh' => 'Ngày sinh',
                'nv_chucvu' => 'Chức vụ',
                'dgd_id' => 'Nơi làm việc',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        //create user
        $user = new User();
        $user->user_name = $request->user_name;
        $user->password = Hash::make($request->password);
        $user->save();
        //create nhanvien
        $nhanvien = new NhanVien();
        $nhanvien->nv_ten = $request->nv_ten;
        $nhanvien->nv_sdt = $request->nv_sdt;
        $nhanvien->nv_ngaysinh = $request->nv_ngaysinh;
        $nhanvien->nv_chucvu = $request->nv_chucvu;
        $nhanvien->dgd_id = $request->dgd_id;

        // $user = User::find($request->user_name);
        $user->nhanvien()->save($nhanvien);

        $ralationship = array("user:user_status,user_name", "diemgd:dgd_ten,dgd_id");
        $result = NhanVien::with($ralationship)->where('user_name', $user->user_name)->get();
        return response()->json([
            "success" => $result,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'nv_ten' => 'max:50',
                'nv_sdt' => 'max:10',
                'nv_ngaysinh' => 'date_format:"Y-m-d"',
                'nv_chucvu' => 'integer',
                'dgd_id' => 'integer',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max',
                'unique' => ':attribute đã tồn tại',
                'date_format' => ':attribute không đúng định dạng (Y-m-d)',
                'integer' => ':attribute phải là số nguyên',
            ],
            [
                'nv_ten' => 'Tên nhân viên',
                'nv_sdt' => 'Số điện thoại',
                'nv_ngaysinh' => 'Ngày sinh',
                'nv_chucvu' => 'Chức vụ',
                'dgd_id' => 'Nơi làm việc',
            ]
        );
        if($request->user_name||$request->password){
            return response()->json([
                'error' => "Không thể thay đổi mật khẩu và tên đăng nhập"
            ]);
        }
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $nhanvien = NhanVien::find($id);
        if (!$nhanvien) {
            return response()->json([
                'error' => "Không tìm thấy thông tin tài khoản cần cập nhật."
            ]);
        };
        if ($request->nv_ten) $nhanvien->nv_ten = $request->nv_ten;
        if ($request->nv_sdt) $nhanvien->nv_sdt = $request->nv_sdt;
        if ($request->nv_ngaysinh) $nhanvien->nv_ngaysinh = $request->nv_ngaysinh;
        if ($request->nv_chucvu) $nhanvien->nv_chucvu = $request->nv_chucvu;
        if ($request->dgd_id) $nhanvien->dgd_id = $request->dgd_id;
        $nhanvien->save();
        $ralationship = array("user:user_status,user_name", "diemgd:dgd_ten,dgd_id");
        $result = NhanVien::with($ralationship)->where('nv_id', $id)->get();
        return response()->json([
            "success" => $result,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $nhanvien = NhanVien::find($id);
        NhanVien::destroy($id);
        User::destroy($nhanvien->user_name);
    }
}
