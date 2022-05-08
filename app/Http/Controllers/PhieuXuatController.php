<?php

namespace App\Http\Controllers;

use App\Models\PhieuXuat;
use App\Models\PhieuXuatChiTiet;
use Illuminate\Http\Request;
use Validator;

class PhieuXuatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ralationship = array("diemDen:dgd_id,dgd_ten");
        $phieuXuats = PhieuXuat::with($ralationship)->get();
        return response()->json([
            "success" => $phieuXuats,
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
                'px_thoigian' => 'required|date_format:"Y-m-d\TH:i"',
                'px_diemden' => 'required',
                'px_chuyenhang' => 'required',
                'px_nguoixuat' => 'required',
            ],
            [
                'required' => ':attribute không được để trống',
                'date_format' => ':attribute không đúng định dạng (Y-m-dTH:i)',
            ],
            [
                'px_thoigian' => 'Thời gian xuất',
                'px_diemden' => 'Điểm đến',
                'px_chuyenhang' => 'Chuyến hàng',
                'px_nguoixuat' => 'Người Xuất',
            ]
        );
        // return validate error
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        // save data to database
        $phieuXuat = new PhieuXuat($request->all());
        $phieuXuat->save();
        //return $phieuXuat data
        $ralationship = array("diemDen:dgd_id,dgd_ten");
        $result = PhieuXuat::with($ralationship)->where('px_id', $phieuXuat->px_id)->get();
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
        //find and check the existence of phieuXuat with $id
        $phieuXuat = PhieuXuat::find($id);
        // return error if phieuXuat is not existing
        if (!$phieuXuat) {
            return response()->json([
                "error" => "Phiếu xuất không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        }
        $ralationship = array("phieuXuatChiTiet:px_id,dh_id", "diemDen:dgd_id,dgd_ten,dgd_tinhHuyenXa,dgd_diachi", "chuyenHang:ch_id,ch_tentaixe,ch_bks");
        $result = PhieuXuat::with($ralationship)->where("px_id", $phieuXuat->px_id)->get();
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
        //find and check the existence of phieuXuat with $id
        $phieuXuat = PhieuXuat::find($id);
        // return error if phieuXuat is not existing
        if (!$phieuXuat) {
            return response()->json([
                "error" => "Phiếu xuất không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        } else {
            /**Update status of PhieuXuat */
            if ($request->px_trangthai) {
                //Validate
                $validator = Validator::make(
                    $request->all(),
                    [
                        'px_trangthai' => 'integer'
                    ],
                    [
                        'integer' => ':attribute phải là số nguyên',
                    ],
                    [
                        'px_trangthai' => 'Trạng thái',
                    ]
                );
                //return validation result if error existing
                if ($validator->fails()) {
                    return response()->json([
                        'error' => $validator->errors()
                    ]);
                }
                //save data to database
                $phieuXuat->px_trangthai = $request->px_trangthai;
                $phieuXuat->save();
            }
            /**Update information about PhieuXuat, except status*/
            if ($request->px_thoigian || $request->px_diemden || $request->px_chuyenhang || $request->px_nguoixuat) {
                //check status of phieuXuat == 0 => update else nothings
                if ($phieuXuat->px_trangthai == 0) {
                    //Validate
                    $validator = Validator::make(
                        $request->all(),
                        [
                            'px_thoigian' => 'date_format:"Y-m-d\TH:i"',
                            'px_nguoixuat' => 'max:10'
                        ],
                        [
                            'date_format' => ':attribute không đúng định dạng (Y-m-d\TH:i)',
                            'max' => ':attribute không được lớn hơn :max'
                        ],
                        [
                            'px_thoigian' => 'Thời gian',
                            'px_nguoixuat' => 'Người xuất'
                        ]
                    );
                    //return validation result if error existing
                    if ($validator->fails()) {
                        return response()->json([
                            'error' => $validator->errors()
                        ]);
                    }
                    //save data to database
                    if ($request->px_thoigian) $phieuXuat->px_thoigian = $request->px_thoigian;
                    if ($request->px_diemden) $phieuXuat->px_diemden = $request->px_diemden;
                    if ($request->px_chuyenhang) $phieuXuat->px_chuyenhang = $request->px_chuyenhang;
                    if ($request->px_nguoixuat) $phieuXuat->px_nguoixuat = $request->px_nguoixuat;
                    $phieuXuat->save();
                }
            }
            //return result
            $ralationship = array("diemDen:dgd_id,dgd_ten");
            $result = PhieuXuat::with($ralationship)->where('px_id', $phieuXuat->px_id)->get();
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
        //find and check the existence of phieuXuat with $id
        $phieuXuat = PhieuXuat::find($id);
        // return error if phieuXuat is not existing
        if (!$phieuXuat) {
            return response()->json([
                "error" => "Phiếu xuất không tồn tại. Vui lòng kiểm tra lại mã phiếu!",
            ]);
        }
        //check status of phieuXuat and return error if status is 0 or 1
        if ($phieuXuat->px_trangthai != 0 & $phieuXuat->px_trangthai != 1) {
            return response()->json([
                "error" => "Không thể xóa phiếu xuất này!",
            ]);
        }
        //delete phieuXuatChiTiet and phieuXuat
        PhieuXuatChiTiet::where('px_id', $phieuXuat->px_id)->delete();
        PhieuXuat::destroy($id);
    }
}
