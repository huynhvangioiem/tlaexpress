<?php

namespace App\Http\Controllers;

use App\Models\ChuyenHang;
use App\Models\LichTrinh;
use Illuminate\Http\Request;
use Validator;

class ChuyenHangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chuyenHangs = ChuyenHang::with('lichTrinh:lt_id,ch_id,dgd_id,lt_loai,lt_thoigian')->get();
        return response()->json([
            "success" => $chuyenHangs,
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
                'ch_tentaixe' => 'required|max:50',
                'ch_bks' => 'required',
                'dgd_xuatPhat' => 'required',
                'batDau' => 'required',
                'diemDen' => 'required',
                'ketThuc' => 'required',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max ký tự',
                'boolean' => ':attribute phải là 0 hoặc 1',
            ],
            [
                'ch_tentaixe' => 'Tên tài xế',
                'ch_bks' => 'Biển kiểm soát',
                'dgd_xuatPhat' => 'Điểm xuất phát',
                'batDau' => 'Thời gian bắt đầu',
                'diemDen' => 'Điểm đến',
                'ketThuc' => 'Thời gian kết thúc',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $chuyenHang = new ChuyenHang();
        $chuyenHang->ch_tentaixe = $request->ch_tentaixe;
        $chuyenHang->ch_bks = $request->ch_bks;
        $chuyenHang->save();

        $xuatPhat = new LichTrinh();
        $xuatPhat->dgd_id = $request->dgd_xuatPhat;
        $xuatPhat->lt_loai = 0;
        $xuatPhat->lt_thoigian = $request->batDau;
        $chuyenHang->lichTrinh()->save($xuatPhat);

        $ketThuc = new LichTrinh();
        $ketThuc->dgd_id = $request->diemDen;
        $ketThuc->lt_loai = 1;
        $ketThuc->lt_thoigian = $request->ketThuc;
        $chuyenHang->lichTrinh()->save($ketThuc);

        $result = ChuyenHang::with('lichTrinh:lt_id,ch_id,dgd_id,lt_loai,lt_thoigian')->where('ch_id', $chuyenHang->ch_id)->get();
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
        $chuyenHang = ChuyenHang::find($id);
        if (!$chuyenHang) {
            return response()->json([
                "error" => "Chuyến hàng không tồn tại. Vui lòng kiểm tra lại mã chuyến hàng!",
            ]);
        } else {
            if($chuyenHang->ch_trangthai!=0){
                return response()->json([
                    "error" => "Không thể chỉnh sửa chuyến hàng này!",
                ]);
            }
            $validator = Validator::make(
                $request->all(),
                [
                    'ch_tentaixe' => 'max:50',
                    'ch_trangthai' => 'integer|max:1',
                    // 'ch_bks' => '',
                    // 'dgd_xuatPhat' => '',
                    // 'batDau' => '',
                    // 'diemDen' => '',
                    // 'ketThuc' => '',
                ],
                [
                    // 'required' => ':attribute không được để trống',
                    'max' => ':attribute không được lớn hơn :max ký tự',
                    // 'boolean' => ':attribute phải là 0 hoặc 1',
                ],
                [
                    'ch_tentaixe' => 'Tên tài xế',
                    // 'ch_bks' => 'Biển kiểm soát',
                    // 'dgd_xuatPhat' => 'Điểm xuất phát',
                    // 'batDau' => 'Thời gian bắt đầu',
                    // 'diemDen' => 'Điểm đến',
                    // 'ketThuc' => 'Thời gian kết thúc',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ]);
            }
            if ($request->ch_tentaixe || $request->ch_bks || $request->ch_trangthai) { //update infomation of chuyenHang
                if ($request->ch_tentaixe) $chuyenHang->ch_tentaixe = $request->ch_tentaixe;
                if ($request->ch_bks) $chuyenHang->ch_bks = $request->ch_bks;
                if ($request->ch_trangthai) $chuyenHang->ch_trangthai = $request->ch_trangthai;
                $chuyenHang->save();
            }
            if ($request->dgd_xuatPhat || $request->batDau) { //update infomation of lichTrinh as start
                $lichTrinh = new LichTrinh;
                $lichTrinh = $chuyenHang->lichTrinh()->get()[0];
                if ($request->dgd_xuatPhat) $lichTrinh->dgd_id = $request->dgd_xuatPhat;
                if ($request->batDau) $lichTrinh->lt_thoigian = $request->batDau;
                $lichTrinh->save();
            }
            if ($request->diemDen || $request->ketThuc) { //update infomation of lichTrinh as end
                $lichTrinh = new LichTrinh;
                $lichTrinh = $chuyenHang->lichTrinh()->get()[1];
                if ($request->diemDen) $lichTrinh->dgd_id = $request->diemDen;
                if ($request->ketThuc) $lichTrinh->lt_thoigian = $request->ketThuc;
                $lichTrinh->save();
            }
            $result = ChuyenHang::with('lichTrinh:lt_id,ch_id,dgd_id,lt_loai,lt_thoigian')->where('ch_id', $chuyenHang->ch_id)->get();
            return response()->json([
                "success" => $result,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $chuyenHang = ChuyenHang::find($id);
        if($chuyenHang->ch_trangthai!=0){
            return response()->json([
                "error" => "Không thể xóa chuyến hàng này!",
            ]);
        }
        LichTrinh::where('ch_id', $id)->delete();
        ChuyenHang::destroy($id);
    }
}
