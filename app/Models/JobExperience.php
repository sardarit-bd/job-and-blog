<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobExperience extends Model
{
    protected $table = 'job_experiences';

    protected $fillable = [
        'all_job_id',
        'experience_id'
    ];

    public function job()
    {
        return $this->belongsTo(AllJob::class, 'all_job_id');
    }

    public function experience()
    {
        return $this->belongsTo(Experience::class, 'experience_id');
    }
}
