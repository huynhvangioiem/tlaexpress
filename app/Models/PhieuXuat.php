<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuXuat extends Model
{
    use HasFactory;

    protected $table = 'phieuxuat';
    public $primaryKey = 'px_id';

    protected $fillable = [
        'px_thoigian',
        'px_diemden',
        'px_chuyenhang',
        'px_nguoixuat',
        'px_trangthai'
    ];

    //ralationship
    public function phieuXuatChiTiet()
    {
        return $this->hasMany(PhieuXuatChiTiet::class, "px_id");
    }
    public function nguoiXuat()
    {
        return $this->belongsTo(User::class, "px_nguoixuat");
    }
    public function diemDen()
    {
        return $this->belongsTo(DiemGD::class, "px_diemden");
    }
    public function chuyenHang()
    {
        return $this->belongsTo(ChuyenHang::class, "px_chuyenhang");
    }
}
