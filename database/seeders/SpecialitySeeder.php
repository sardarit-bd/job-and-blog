<?php

namespace Database\Seeders;

use App\Models\Speciality;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SpecialitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specialities = [
            'Nurse Writer',
            'Legal Nurse Consultant (LNC)',
            'Case Management (CM)',
        ];

        foreach ($specialities as $speciality) {
            Speciality::create(['name' => $speciality]);
        }
    }
}
