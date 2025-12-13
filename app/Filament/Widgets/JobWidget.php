<?php

namespace App\Filament\Widgets;

use App\Models\AllJob;
use App\Models\JobType;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class JobWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Jobs', AllJob::count()),
            Stat::make('Total Job types', JobType::count()),
        ];
    }
}
