<?php

namespace App\Http\Controllers;

use App\Models\DonHang;
use App\Models\PhieuXuatChiTiet;
use Illuminate\Http\Request;
use Validator;

class PhieuXuatChiTietController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //validate request
        $validator = Validator::make(
            $request->all(),
            [
                'px_id' => 'required',
                'dh_id' => 'required',
            ],
            [
                'required' => ':attribute không được để trống',
            ],
            [
                'px_id' => 'Mã phiếu xuất',
                'dh_id' => 'Mã đơn hàng',
            ]
        );
        // return validate error
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $donHang = DonHang::find($request->dh_id);
        if(substr($donHang->dh_vitri,0,2)=="PX"){
            return response()->json([
                "error" => "Đơn hàng đã được xuất trước đó",
            ]);
        }
        // save data to database
        $phieuXuatChiTiet = new PhieuXuatChiTiet($request->all());
        $phieuXuatChiTiet->save();
        return response()->json([
            "success" => $phieuXuatChiTiet,
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
