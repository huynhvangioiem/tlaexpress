<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    use HasFactory;
    protected $table = 'nhanvien';
    public $primaryKey = 'nv_id';


    protected $hidden = [
        // 'user_name',
    ];
    //  ralationship
    public function user()
    {
        return $this->belongsTo(User::class, "user_name");
    }
    public function diemgd()
    {
        return $this->belongsTo(DiemGD::class, "dgd_id");
    }
}
