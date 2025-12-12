<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AllJob extends Model
{
    protected $fillable = [
        'company_id',
        'title',
        'slug',
        'license_type',
        'job_type',
        'schedule',
        'salaray_transparency',
        'salary_range',
        'specialization',
        'fern_notes',
        'description',
        'image',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
