<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AllJob extends Model
{
    protected $fillable = [
        'company_id',
        'user_id',
        'title',
        'slug',
        'license_type',
        'schedule',
        'salaray_transparency',
        'salary_range',
        'fern_notes',
        'description',
        'image',
    ];

    protected static function booted()
    {
        static::creating(function ($job) {
            if (auth()->check()) {
                $job->user_id = auth()->id();
            }
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function jobTypes()
    {
        return $this->belongsToMany(JobType::class, 'all_job_types', 'all_job_id', 'job_type_id');
    }

    public function specialities()
    {
        return $this->belongsToMany(Speciality::class, 'job_specialities', 'all_job_id', 'speciality_id');
    }

    public function jobLicensedIns()
    {
        return $this->belongsToMany(LicensedIn::class, 'job_licensed_ins', 'all_job_id', 'licensed_in_id');
    }

    public function jobRemoteStatuses()
    {
        return $this->belongsToMany(RemoteStatus::class, 'job_remote_statuses', 'all_job_id', 'remote_status_id');
    }

    public function jobWorkFroms()
    {
        return $this->belongsToMany(LicensedIn::class, 'job_work_froms', 'all_job_id', 'licensed_in_id');
    }

    public function experiences()
    {
        return $this->belongsToMany(
            Experience::class,
            'job_experiences',
            'all_job_id',
            'experience_id'
        );
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'job_applications')
            ->withPivot('status')
            ->withTimestamps();
    }
}
