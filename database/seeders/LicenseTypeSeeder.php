<?php

namespace Database\Seeders;

use App\Models\LicensedType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LicenseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'RN',
            'LVN/LPN',
            'NP',
            'Non Licensed',
            'Other License'
        ];

        foreach ($types as $type)
        {
            LicensedType::create(['name' => $type]);
        }
    }
}
