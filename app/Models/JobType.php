<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobType extends Model
{
    protected $fillable = ['name'];

    public function allJobs()
    {
        return $this->belongsToMany(AllJob::class, 'all_job_types', 'job_type_id', 'all_job_id');
    }

}
