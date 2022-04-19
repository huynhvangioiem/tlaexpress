<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiaoHang extends Model
{
    use HasFactory;
    protected $table = 'giaohang';
    public $primaryKey = 'gh_id';

    //ralationship
    public function donHang()
    {
        return $this->hasMany(GiaoHangChiTiet::class, "gh_id");
    }
    public function nguoiGiao()
    {
        return $this->belongsTo(User::class, "gh_nguoigiao");
    }
}
