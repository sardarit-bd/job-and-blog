<?php

namespace Database\Seeders;

use App\Models\RemoteStatus;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RemoteStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            'Onsite',
            'Remote',
            'Hybrid',
            'Travel',
            'Remote After Training'
        ];
        
        foreach ($statuses as $status) {
            RemoteStatus::create(['name' => $status]);
        }
    }
}
