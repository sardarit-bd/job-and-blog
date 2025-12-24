<?php

namespace App\Filament\Widgets;

use App\Models\AllJob;
use App\Models\JobApplication;
use App\Models\JobType;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TotalJobs extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Total Jobs', function() {
                return AllJob::whereHas('company', function($query) {
                    $query->where('user_id', auth()->id());
                })->count();
            })
            ->description('Total Jobs of you companies')
            ->extraAttributes([
                'class' => 'bg-[#f2ebe6] text-white rounded-xl shadow-lg',
            ]),

            Stat::make('Total Applications', function() {
                return JobApplication::whereHas('job.company', fn($q) => $q->where('user_id', auth()->id()))->count();
            })
            ->description('All applications for your companies')
            ->extraAttributes([
                'class' => 'bg-[#f2cfc2] text-white rounded-xl shadow-lg cursor-pointer',
            ]),

            Stat::make('Total Job Types', JobType::count())
            ->description('Various job types like remote, hybrid, onsite etc.')
            ->extraAttributes([
                'class' => 'bg-[#bcd0ca] text-white rounded-xl shadow-lg cursor-pointer',
            ]),

        ];
    }
}
