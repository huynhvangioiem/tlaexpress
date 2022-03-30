<?php

namespace App\Http\Controllers;

use App\Models\DiemGD;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiemGDController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $diemgds = DiemGD::all();
        return response()->json([
            "success" => $diemgds,
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
                'dgd_ten' => 'required|max:255|unique:diemgd',
                'dgd_tinhHuyenXa' => 'required|max:13',
                'dgd_diachi' => 'required|max:255',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max',
                'unique' => ':attribute đã tồn tại',
            ],
            [
                'dgd_ten' => 'Tên điểm giao dịch',
                'dgd_tinhHuyenXa' => 'Mã đơn vị hành chính',
                'dgd_diachi' => 'Địa chỉ',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ],240);
        };

        $diemgds = new DiemGD($request->all());
        $diemgds->save();
        return response()->json([
            "success" => $diemgds,
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
        $diemgds = DiemGD::find($id);
        if ($diemgds) {
            return response()->json([
                "success" => $diemgds,
            ]);
        } else {
            return response()->json([
                "error" => "Không tìm thấy điểm giao dịch",
            ], 244);
        }
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
                'dgd_ten' => 'max:255',
                'dgd_tinhHuyenXa' => 'max:13',
                'dgd_diachi' => 'max:255',
                // 'dgd_mota' => '',
                'dgd_status' => 'boolean',
            ],
            [
                'max' => ':attribute không được lớn hơn :max',
                'boolean' => ':attribute phải là 0 hoặc 1',
            ],
            [
                'dgd_ten' => 'Tên điểm giao dịch',
                'dgd_tinhHuyenXa' => 'Mã đơn vị hành chính',
                'dgd_diachi' => 'Địa chỉ',
                'dgd_status' => 'Trạng thái',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 205);
        };
        $diemgd = DiemGD::find($id);
        if (!$diemgd) {
            return response()->json([
                'error' => "Không tìm thấy điểm giao dịch cần cập nhật."
            ],244);
        };
        if ($request->dgd_ten) $diemgd->dgd_ten = $request->dgd_ten;
        if ($request->dgd_tinhHuyenXa) $diemgd->dgd_tinhHuyenXa = $request->dgd_tinhHuyenXa;
        if ($request->dgd_diachi) $diemgd->dgd_diachi = $request->dgd_diachi;
        if ($request->dgd_mota) $diemgd->dgd_mota = $request->dgd_mota;
        if ($request->dgd_status) $diemgd->dgd_status = $request->dgd_status;
        $diemgd->save();
        return response()->json([
            "success" => $diemgd,
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
        DiemGD::destroy($id);
    }
}
