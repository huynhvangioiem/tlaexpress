<?php

namespace App\Http\Controllers;

use App\Models\GiaoHang;
use App\Models\GiaoHangChiTiet;
use Illuminate\Http\Request;
use Validator;

class GiaoHangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $giaoHang = GiaoHang::all();
        return response()->json([
            "success" => $giaoHang,
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
        //validate request
        $validator = Validator::make(
            $request->all(),
            [
                'gh_nguoigiao' => 'required|max:10',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max',
            ],
            [
                'gh_nguoigiao' => 'Người giao',
            ]
        );
        // return validate error
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        // save data to database
        $giaoHang = new GiaoHang($request->all());
        $giaoHang->save();
        //return $giaohang data
        $result = GiaoHang::where('gh_id', $giaoHang->gh_id)->get();
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
        //find and check the existence of giaoHang with $id
        $giaoHang = GiaoHang::find($id);
        // return error if phieuXuat is not existing
        if (!$giaoHang) {
            return response()->json([
                "error" => "Phiếu giao hàng không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        }
        $ralationship = array("donHang:gh_id,dh_id");
        $result = GiaoHang::with($ralationship)->where("gh_id", $giaoHang->gh_id)->get();
        return response()->json([
            "success" => $result,
        ]);
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
        //find and check the existence of giaoHang with $id
        $giaoHang = GiaoHang::find($id);
        // return error if gia$giaoHang is not existing
        if (!$giaoHang) {
            return response()->json([
                "error" => "Phiếu giao hàng không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        } else {
            /**Update status of giaoHang*/
            //Validate
            $validator = Validator::make(
                $request->all(),
                [
                    'gh_trangthai' => 'integer'
                ],
                [
                    'integer' => ':attribute phải là số nguyên',
                ],
                [
                    'gh_trangthai' => 'Trạng thái',
                ]
            );
            //return validation result if error existing
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ]);
            }
            //save data to database
            $giaoHang->gh_trangthai = $request->gh_trangthai;
            $giaoHang->save();
            $ralationship = array("donHang:gh_id,dh_id");
            $result = GiaoHang::with($ralationship)->where("gh_id", $giaoHang->gh_id)->get();
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
        //find and check the existence of giaoHang with $id
        $giaoHang = giaoHang::find($id);
        // return error if giaoHang is not existing
        if (!$giaoHang) {
            return response()->json([
                "error" => "Phiếu giao hàng không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        }
        //check status of giaoHang and return error if status is 0
        if ($giaoHang->gh_trangthai  != 0) {
            return response()->json([
                "error" => "Không thể xóa phiếu giao hàng này!",
            ]);
        }
        //delete giaoHangChiTiet and giaoHang
        GiaoHangChiTiet::where('gh_id', $giaoHang->gh_id)->delete();
        GiaoHang::destroy($id);
    }
}
