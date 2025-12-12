<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'email',
        'address',
        'description',
        'website',
        'image',
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }  
}
