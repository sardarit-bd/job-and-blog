<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];


    public function allJobs()
    {
        return $this->belongsToMany(
            AllJob::class,
            'job_experiences',
            'experience_id',
            'all_job_id'
        );
    }
}
