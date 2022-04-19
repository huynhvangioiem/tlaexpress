<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuXuatChiTiet extends Model
{
    use HasFactory;
    protected $table = 'phieuxuatchitiet';
    public $primaryKey = 'pxct_id';

    //ralationship
    public function donHang()
    {
        return $this->belongsTo(DonHang::class, "dh_id");
    }
    public function phieuXuat()
    {
        return $this->belongsTo(PhieuXuat::class, "px_id");
    }
}
