<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_id',
        'specialization',
        'contact',
    ];

    // Optional: Relationship to service jobs if you plan to link them later
    public function jobs()
    {
        return $this->hasMany(ServiceJob::class); // We will build this next!
    }
}