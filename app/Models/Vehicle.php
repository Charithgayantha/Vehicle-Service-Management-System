<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'customer_id',
        'make',
        'model',
        'year',
        'license_plate',
        'vin',
        'color',
    ];

    /**
     * Get the customer that owns the vehicle.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}