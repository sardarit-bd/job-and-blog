<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobLicensedIn extends Model
{
    protected $fillable = [
        'all_job_id',
        'licensed_in_id',
    ];

    public $timestamps = false;
}
