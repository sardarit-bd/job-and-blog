<?php

namespace Database\Seeders;

use App\Models\Schedule;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = [
            'Days',
            'Evenings',
            'Nights',
            '8hr shifts',
            '9hr shifts',
            '10hr shifts',
            '12hr shifts',
            'Weekends',
        ];

        foreach ($schedules as $schedule) {
            Schedule::create(['name' => $schedule]);
        }
    }
}
