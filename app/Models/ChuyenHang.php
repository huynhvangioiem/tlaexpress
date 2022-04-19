<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuyenHang extends Model
{
    use HasFactory;
    protected $table = 'chuyenhang';
    public $primaryKey = 'ch_id';

    //ralationship
    public function phieuXuat()
    {
        return $this->hasMany(PhieuXuat::class, "px_chuyenhang");
    }
    public function lichTrinh()
    {
        return $this->hasMany(LichTrinh::class, "ch_id");
    }
}
