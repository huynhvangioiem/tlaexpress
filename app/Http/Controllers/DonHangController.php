<?php

namespace App\Http\Controllers;

use App\Models\DiemGD;
use App\Models\DonHang;
use App\Models\LichSuDonHang;
use Illuminate\Http\Request;
use Validator;

class DonHangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ralationship = array("khoPhat:dgd_id,dgd_ten");
        $donHang = DonHang::with($ralationship)->get();
        return response()->json([
            "success" => $donHang
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
                'dh_diachigui' => 'required',
                'dh_diachinhan' => 'required',
                'dh_dvhcgui' => 'required|max:13',
                'dh_dvhcnhan' => 'required|max:13',
                // 'dh_huongdangiao' => 'required|',
                'dh_khophat' => 'required',
                // 'dh_mota' => 'required|',
                'dh_nguoitao' => 'required|max:10',
                'dh_nguoitra' => 'required|boolean',
                'dh_phivanchuyen' => 'required|integer',
                'dh_sdtgui' => 'required|max:10',
                'dh_sdtnhan' => 'required|max:10',
                'dh_tengui' => 'required|max:50',
                'dh_tennhan' => 'required|max:50',
                'dh_thuho' => 'required|integer',
                'dh_trangthai' => 'required',
                'dh_trongluong' => 'required|integer',
                'dh_tulay' => 'required|boolean',
                'dh_vitri' => 'max:255',
            ],
            [
                'required' => ':attribute không được để trống',
                'max' => ':attribute không được lớn hơn :max ký tự',
                'boolean' => ':attribute phải là 0 hoặc 1',
            ],
            [
                'dh_diachigui' => 'Địa chỉ ngưởi gửi',
                'dh_diachinhan' => 'Địa chỉ ngưởi nhận',
                'dh_dvhcgui' => 'Mã đvhc ngươi gửi',
                'dh_dvhcnhan' => 'Mã đvhc người nhận',
                'dh_huongdangiao' => 'Hướng dẫn phát',
                'dh_khophat' => 'Kho phát',
                'dh_mota' => 'Mô tả hàng hóa',
                'dh_nguoitao' => 'Người tạo',
                'dh_nguoitra' => 'Người trả phí vận chuyển',
                'dh_phivanchuyen' => 'Phí vận chuyển',
                'dh_sdtgui' => 'SĐT người gửi',
                'dh_sdtnhan' => 'SĐT người nhận',
                'dh_tengui' => 'Tên người gửi',
                'dh_tennhan' => 'Tên người nhận',
                'dh_thuho' => 'Số tiền thu hộ',
                'dh_trangthai' => 'Trạng thái',
                'dh_trongluong' => 'Trọng lượng',
                'dh_tulay' => 'Tự lấy',
                'dh_vitri' => 'Vị trí',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ]);
        }
        $donHang = new DonHang($request->all());
        $donHang->save();
        $lichSuDonHang = new LichSuDonHang();
        $lichSuDonHang->lsdh_vitri = $donHang->dh_vitri;
        $donHang->lichSuDonHang()->save($lichSuDonHang);

        $result = DonHang::with('khoPhat:dgd_id,dgd_ten')->where('dh_id', $donHang->dh_id)->get();
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
        $ralationship = array('khoPhat:dgd_id,dgd_ten', 'lichSuDonHang');
        $donHang = DonHang::with($ralationship)->where('dh_id', $id)->get();
        if (sizeof($donHang) == 0) {
            return response()->json([
                "error" => "Đơn hàng không tồn tại. Vui lòng kiểm tra lại mã đơn hàng!",
            ]);
        }

        return response()->json([
            "success" => $donHang,
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
        $donHang = DonHang::find($id); //find the data of DonHang
        if (!$donHang) { //if not exists
            return response()->json([
                "error" => "Đơn hàng không tồn tại. Vui lòng kiểm tra lại mã đơn hàng!",
            ]);
        } else {
            //validate
            $validator = Validator::make(
                $request->all(),
                [
                    // 'dh_diachigui' => 'required',
                    // 'dh_diachinhan' => 'required',
                    'dh_dvhcgui' => 'max:13',
                    'dh_dvhcnhan' => 'max:13',
                    // 'dh_huongdangiao' => 'required|',
                    // 'dh_khophat' => 'required',
                    // 'dh_mota' => 'required|',
                    'dh_nguoitra' => 'boolean',
                    'dh_phivanchuyen' => 'integer',
                    'dh_sdtgui' => 'max:10',
                    'dh_sdtnhan' => 'max:10',
                    'dh_tengui' => 'max:50',
                    'dh_tennhan' => 'max:50',
                    'dh_thuho' => 'integer',
                    'dh_trangthai' => 'integer',
                    'dh_trongluong' => 'integer',
                    'dh_tulay' => 'boolean',
                    'dh_vitri' => 'max:255',
                ],
                [
                    'required' => ':attribute không được để trống',
                    'max' => ':attribute không được lớn hơn :max ký tự',
                    'boolean' => ':attribute phải là 0 hoặc 1',
                ],
                [
                    'dh_diachigui' => 'Địa chỉ ngưởi gửi',
                    'dh_diachinhan' => 'Địa chỉ ngưởi nhận',
                    'dh_dvhcgui' => 'Mã đvhc ngươi gửi',
                    'dh_dvhcnhan' => 'Mã đvhc người nhận',
                    'dh_huongdangiao' => 'Hướng dẫn phát',
                    'dh_khophat' => 'Kho phát',
                    'dh_mota' => 'Mô tả hàng hóa',
                    'dh_nguoitao' => 'Người tạo',
                    'dh_nguoitra' => 'Người trả phí vận chuyển',
                    'dh_phivanchuyen' => 'Phí vận chuyển',
                    'dh_sdtgui' => 'SĐT người gửi',
                    'dh_sdtnhan' => 'SĐT người nhận',
                    'dh_tengui' => 'Tên người gửi',
                    'dh_tennhan' => 'Tên người nhận',
                    'dh_thuho' => 'Số tiền thu hộ',
                    'dh_trangthai' => 'Trạng thái',
                    'dh_trongluong' => 'Trọng lượng',
                    'dh_tulay' => 'Tự lấy',
                    'dh_vitri' => 'Vị trí',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ]);
            }

            if ($request->dh_trangthai || $request->dh_vitri) { //cap nhat trang thai hoac vitri
                if ($request->dh_trangthai) $donHang->dh_trangthai = $request->dh_trangthai;
                if ($request->dh_vitri) $donHang->dh_vitri = $request->dh_vitri;
            } else {
                if ($donHang->dh_trangthai != 1) { //check if state is not 1
                    return response()->json([
                        "error" => "Không thể chỉnh sửa đơn hàng này!",
                    ]);
                } else { // cap nhat thong tin don hang
                    if ($request->dh_tengui) $donHang->dh_tengui = $request->dh_tengui;
                    if ($request->dh_sdtgui) $donHang->dh_sdtgui = $request->dh_sdtgui;
                    if ($request->dh_dvhcgui) $donHang->dh_dvhcgui = $request->dh_dvhcgui;
                    if ($request->dh_diachigui) $donHang->dh_diachigui = $request->dh_diachigui;
                    if ($request->dh_tennhan) $donHang->dh_tennhan = $request->dh_tennhan;
                    if ($request->dh_sdtnhan) $donHang->dh_sdtnhan = $request->dh_sdtnhan;
                    if ($request->dh_dvhcnhan) $donHang->dh_dvhcnhan = $request->dh_dvhcnhan;
                    if ($request->dh_diachinhan) $donHang->dh_diachinhan = $request->dh_diachinhan;
                    if ($request->dh_khophat) $donHang->dh_khophat = $request->dh_khophat;
                    if ($request->dh_mota) $donHang->dh_mota = $request->dh_mota;
                    if ($request->dh_trongluong) $donHang->dh_trongluong = $request->dh_trongluong;
                    if ($request->dh_huongdangiao) $donHang->dh_huongdangiao = $request->dh_huongdangiao;
                    if ($request->dh_thuho) $donHang->dh_thuho = $request->dh_thuho;
                    if ($request->dh_phivanchuyen) $donHang->dh_phivanchuyen = $request->dh_phivanchuyen;
                    if ($request->dh_nguoitra) $donHang->dh_nguoitra = $request->dh_nguoitra;
                    if ($request->dh_tulay) $donHang->dh_tulay = $request->dh_tulay;
                }
            }
            $donHang->save();
            $ralationship = array('khoPhat:dgd_id,dgd_ten', 'lichSuDonHang');
            $donHang = DonHang::with($ralationship)->where('dh_id', $id)->get();
            return response()->json([
                "success" => $donHang,
            ]);
        };
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $donHang = DonHang::find($id);
        if($donHang->dh_trangthai != 1){
            return response()->json([
                "error" => "Không thể xóa đơn hàng này!",
            ]);
        }
        LichSuDonHang::where('dh_id', $id)->delete();
        DonHang::destroy($id);
    }
}
