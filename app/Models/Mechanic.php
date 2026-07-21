<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'specialization', 'status'];

    public function jobCards()
    {
        return $this->hasMany(JobCard::class);
    }
}