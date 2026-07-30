<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobCard extends Model
{
    use HasFactory;

    // Disables mass-assignment restriction so all form fields save properly
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function mechanic()
    {
        return $this->belongsTo(Mechanic::class);
    }

    public function parts()
    {
        // Updated 'price' to 'unit_price' to match the migration[cite: 1, 2]
        return $this->belongsToMany(Part::class, 'job_card_part')->withPivot('quantity', 'unit_price'); 
    }
}