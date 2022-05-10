<?php

namespace App\Http\Controllers;

use App\Models\DonHang;
use App\Models\GiaoHangChiTiet;
use Illuminate\Http\Request;
use Validator;

class GiaoHangChiTietController extends Controller
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
                'gh_id' => 'required',
                'dh_id' => 'required',
            ],
            [
                'required' => ':attribute không được để trống',
            ],
            [
                'gh_id' => 'Mã phiếu giao',
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
        if ($donHang->dh_trangthai == 4) {
            return response()->json([
                "error" => "Đơn hàng DH".$donHang->dh_id." đang được giao",
            ]);
        }
        // save data to database
        $giaoHangChiTiet = new GiaoHangChiTiet($request->all());
        $giaoHangChiTiet->save();
        return response()->json([
            "success" => $giaoHangChiTiet,
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
