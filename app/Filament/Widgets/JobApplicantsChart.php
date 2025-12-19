<?php

namespace App\Filament\Widgets;

use App\Models\AllJob;
use Filament\Widgets\ChartWidget;

class JobApplicantsChart extends ChartWidget
{
    protected static ?int $sort = 3;
    protected ?string $heading = 'Job Applicants Chart';

    protected function getData(): array
    {
        $userId = auth()->id();

        $colors = [
            '#10B981', // teal
            '#3B82F6', // blue
            '#F59E0B', // amber
            '#EF4444', // red
            '#8B5CF6', // purple
            '#EC4899', // pink
            '#F97316', // orange
        ];


        $jobs = AllJob::whereHas('company', fn($q) => $q->where('user_id', $userId))
            ->withCount('applications')
            ->orderBy('applications_count', 'desc')
            ->limit(7)
            ->get();

        $labels = $jobs->pluck('title')->toArray();
        $data = $jobs->pluck('applications_count')->map(fn($count) => (int) $count)->toArray();

        $backgroundColors = [];
        foreach ($data as $i => $value) {
            $backgroundColors[] = $colors[$i % count($colors)];
        }


        return [
            'datasets' => [
                [
                    'label' => 'Applicants',
                    'data' => $data,
                    'backgroundColor' => $backgroundColors,
                    'borderColor' => '#fff',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
