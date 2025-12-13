<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experiences = [
            'Direct patient care',
            'Some Non-bedside',
            'Advanced Non-bedside',
            'Leadership',
            'Customer Service'
        ];

        foreach ($experiences as $experience) {
            Experience::create(['title' => $experience]);
        }
    }
}
