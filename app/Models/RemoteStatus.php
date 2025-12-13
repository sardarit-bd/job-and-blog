<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RemoteStatus extends Model
{
    protected $fillable = ['name'];

    public function allJobs()
    {
        return $this->belongsToMany(AllJob::class, 'job_remote_statuses', 'remote_status_id', 'all_job_id');
    }
}
