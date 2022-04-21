<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LichTrinh extends Model
{
    use HasFactory;
    protected $table = 'lichtrinh';
    public $primaryKey = 'lt_id';
    protected $fillable = [
        'dgd_id',
        'lt_loai',
        'lt_thoigian'
    ];

    //ralationship
    public function diemgd()
    {
        return $this->belongsTo(DiemGD::class, "dgd_id");
    }
    public function chuyenHang()
    {
        return $this->belongsTo(ChuyenHang::class, "ch_id");
    }
}
