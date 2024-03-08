<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resident extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    public function houseResidentHistories()
    {
        return $this->hasMany(HouseResidentHistory::class);
    }

    public function houses()
    {
        return $this->hasManyThrough(
            House::class,
            HouseResidentHistory::class,
            'resident_id',
            'id',
            'id',
            'house_id'
        );
    }

    public function housePaymentHistories()
    {
        return $this->hasMany(HousePaymentHistory::class);
    }
}
