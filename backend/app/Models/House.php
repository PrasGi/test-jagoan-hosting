<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class House extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    public function houseResidentHistories()
    {
        return $this->hasMany(HouseResidentHistory::class);
    }

    public function residents()
    {
        return $this->hasManyThrough(
            Resident::class,
            HouseResidentHistory::class,
            'house_id', // Foreign key pada tabel pivot
            'id', // Foreign key pada tabel target (Resident)
            'id', // Lokal key pada tabel asal (House)
            'resident_id' // Lokal key pada tabel pivot
        )->orderByDesc('house_resident_histories.created_at')->limit(1);
    }

    public function historyResidents()
    {
        return $this->hasManyThrough(
            Resident::class,
            HouseResidentHistory::class,
            'house_id', // Foreign key pada tabel pivot
            'id', // Foreign key pada tabel target (Resident)
            'id', // Lokal key pada tabel asal (House)
            'resident_id' // Lokal key pada tabel pivot
        )->orderBy('house_resident_histories.created_at');
    }

    public function housePaymentHistories()
    {
        return $this->hasMany(HousePaymentHistory::class);
    }
}
