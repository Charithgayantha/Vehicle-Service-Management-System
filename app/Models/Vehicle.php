<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'license_plate', 'make', 'model', 'year', 'mileage'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function jobCards()
    {
        return $this->hasMany(JobCard::class);
    }
}