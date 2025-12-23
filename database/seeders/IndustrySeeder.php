<?php

namespace Database\Seeders;

use App\Models\Industry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Healthcare',
            'Legal',
            'Construction',
            'Tech',
            'IT',
            'Finance',
            'Misc'
        ];

        foreach ($types as $type) {
            Industry::create([
                "name" => $type
            ]);
        }
    }
}
