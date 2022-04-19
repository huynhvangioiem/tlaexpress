<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiaoHangChiTiet extends Model
{
    use HasFactory;
    protected $table = 'giaohangchitiet';
    public $primaryKey = 'ghct_id';

    //ralationship
    public function donHang()
    {
        return $this->belongsTo(DonHang::class, "dh_id");
    }
    public function giaoHang()
    {
        return $this->belongsTo(GiaoHang::class, "gh_id");
    }
}
