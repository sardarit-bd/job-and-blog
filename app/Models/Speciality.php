<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    protected $fillable = ['name'];

    public function allJobs()
    {
        return $this->belongsToMany(AllJob::class, 'job_specialities', 'speciality_id', 'all_job_id');
    }
}
