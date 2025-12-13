<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LicensedIn extends Model
{
    protected $fillable = ['name', 'short'];

    public function allJobs()
    {
        return $this->belongsToMany(
            AllJob::class,
            'job_licensed_ins',
            'licensed_in_id',
            'all_job_id'
        );
    }

    public function workFromJobs()
    {
        return $this->belongsToMany(
            AllJob::class,
            'job_work_froms',
            'licensed_in_id',
            'all_job_id'
        );
    }
}
