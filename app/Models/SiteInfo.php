<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteInfo extends Model
{
    protected $table = 'site_infos';

    protected $fillable = [
        'icon',
        'contact_us'
    ];
}
