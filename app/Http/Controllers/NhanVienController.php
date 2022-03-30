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
        $nhanvien = NhanVien::with('user:user_name,user_status')->get();
        return response()->json([
            "success" => $nhanvien,
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

        $user = User::find($request->user_name);
        $user->nhanvien()->save($nhanvien);
        return response()->json([
            "success" => $nhanvien,
        ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
