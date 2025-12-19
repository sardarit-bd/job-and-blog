<?php

namespace App\Filament\Widgets;

use Carbon\Carbon;
use App\Models\AllJob;
use Filament\Widgets\ChartWidget;

class JobPostsChart extends ChartWidget
{
    protected static ?int $sort = 2;
    protected ?string $heading = 'Total Job Post Created';

    protected function getData(): array
    {
        $userId = auth()->id();

        $months = collect(range(1, 12))
            ->map(fn($m) => Carbon::create()->month($m)->format('M'))
            ->toArray();

        $jobsPerMonth = AllJob::whereHas('company', fn($q) => $q->where('user_id', $userId))
            ->whereYear('created_at', now()->year)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->get()
            ->pluck('total', 'month')
            ->map(fn($count) => (int) $count)
            ->toArray();

        $data = [];
        foreach (range(1, 12) as $month) {
            $data[] = $jobsPerMonth[$month] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jobs Created',
                    'data' => $data,
                    'backgroundColor' => '#36A2EB',
                    'borderColor' => '#9BD0F5',
                    'fill' => false,
                ],
            ],
            'labels' => $months,
        ];
    }

    protected function getOptions(): array
{
    $maxJobs = max($this->getData()['datasets'][0]['data']); // get highest value
    $suggestedMax = max(10, $maxJobs + 5); // at least 10, or a bit more than actual max

    return [
        'scales' => [
            'y' => [
                'beginAtZero' => true,
                'ticks' => [
                    'stepSize' => 1,
                    'precision' => 0,
                ],
                'suggestedMax' => $suggestedMax,
            ],
        ],
    ];
}

    protected function getType(): string
    {
        return 'line';
    }
}