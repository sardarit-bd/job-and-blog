<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Healthcare extends Model
{
    protected $table = 'healthcares';

    protected $fillable = [
        'industry_id',
        'name',
        'rn',
        'physician',
        'allied_health',
        'administrator',
    ];

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }
}
