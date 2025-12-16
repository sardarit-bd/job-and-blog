<?php

namespace Database\Seeders;

use App\Models\JobType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'FT',
            'PT',
            'Contract',
            'Per Diem'
        ];

        foreach ($types as $type)
        {
            JobType::create(['name' => $type]);
        }
    }
}
