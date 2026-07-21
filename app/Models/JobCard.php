<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_number',
        'customer_id',
        'vehicle_id',
        'mechanic_id',
        'user_id',
        'status',
        'problem_description',
        'ai_diagnosis',
        'ai_estimated_cost',
        'labor_cost',
        'total_cost',
        'scheduled_at',
        'completed_at',
    ];

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parts()
    {
        return $this->belongsToMany(Part::class)->withPivot('quantity', 'unit_price')->withTimestamps();
    }
}