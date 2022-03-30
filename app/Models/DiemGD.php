<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiemGD extends Model
{
    use HasFactory;
    protected $table = 'diemgd';
    public $primaryKey = 'dgd_id';

    protected $fillable = [
        'dgd_ten',
        'dgd_tinhHuyenXa',
        'dgd_diachi',
        'dgd_mota'
    ];

    //  ralationship
    public function nhanvien()
    {
        return $this->hasMany(NhanVien::class, "dgd_id");
    }
}
