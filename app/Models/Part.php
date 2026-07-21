<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'sku', 'price', 'stock_quantity', 'min_stock_level'];

    public function jobCards()
    {
        return $this->belongsToMany(JobCard::class)->withPivot('quantity', 'unit_price')->withTimestamps();
    }
}