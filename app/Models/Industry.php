<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    protected $fillable = ['name'];

    public function alljobs() {
        return $this->belongsToMany(
            AllJob::class,
            'all_job_industry',
            'industry_id',
            'all_job_id'
        );
    }

    public function healthcares() {
        return $this->hasMany(Healthcare::class);
    }
}
