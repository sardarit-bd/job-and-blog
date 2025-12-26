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

    protected $casts = [
        'rn' => 'array',
        'physician' => 'array',
        'allied_health' => 'array',
    ];

    public function allJob()
    {
        return $this->hasOne(AllJob::class);
    }
}
