<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobSpeciality extends Model
{
    protected $fillable = [
        'all_job_id',
        'speciality_id',
    ];

    public function allJobs()
    {
        return $this->belongsTo(AllJob::class, 'all_job_id');
    }

    public function specialities()
    {
        return $this->belongsTo(Speciality::class, 'speciality_id');
    }
}
