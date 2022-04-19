<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonHang extends Model
{
    use HasFactory;

    protected $table = 'donhang';
    public $primaryKey = 'dh_id';

    protected $fillable = [
        'dh_diachigui',
        'dh_diachinhan',
        'dh_dvhcgui',
        'dh_dvhcnhan',
        'dh_huongdangiao',
        'dh_khophat',
        'dh_mota',
        'dh_nguoitao',
        'dh_nguoitra',
        'dh_phivanchuyen',
        'dh_sdtgui',
        'dh_sdtnhan',
        'dh_tengui',
        'dh_tennhan',
        'dh_thuho',
        'dh_trangthai',
        'dh_trongluong',
        'dh_tulay',
        'dh_vitri',
    ];

    //ralationship
    public function user()
    {
        return $this->belongsTo(User::class, "dh_nguoitao");
    }
    public function khoPhat()
    {
        return $this->belongsTo(DiemGD::class, "dh_khophat");
    }
    public function lichSuDonHang()
    {
        return $this->hasMany(LichSuDonHang::class, "dh_id");
    }
    public function giaoHangChiTiet()
    {
        return $this->hasMany(GiaoHangChiTiet::class, "dh_id");
    }
    public function phieuXuatChiTiet()
    {
        return $this->hasMany(PhieuXuatChiTiet::class, "dh_id");
    }
}
