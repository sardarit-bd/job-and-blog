<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobWorkFrom extends Model
{
    protected $table = 'job_work_froms';

    protected $fillable = [
        'all_job_id',
        'licensed_in_id'
    ];

    public $timestamps = false;
}
