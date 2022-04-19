<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LichSuDonHang extends Model
{
    use HasFactory;
    protected $table = 'lichsudonhang';
    public $primaryKey = 'lsdh_id';

    //ralationship
    public function donHang()
    {
        return $this->belongsTo(DonHang::class, "dh_id");
    }

}
