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
        'user_id',
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    } 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
