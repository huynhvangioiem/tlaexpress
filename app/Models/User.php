<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_name';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'user_name',
        'password',
        'user_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

    //  ralationship
    public function nhanvien()
    {
        return $this->hasOne(NhanVien::class, "user_name");
    }
    public function donHang()
    {
        return $this->hasMany(DonHang::class, "dh_nguoitao");
    }
    public function giaoHang()
    {
        return $this->hasMany(GiaoHang::class, "gh_nguoigiao");
    }
    public function phieuXuat()
    {
        return $this->hasMany(PhieuXuat::class, "px_id");
    }
}
