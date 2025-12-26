<?php

namespace App\Filament\Resources\Healthcares\Pages;

use App\Filament\Resources\Healthcares\HealthcareResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageHealthcares extends ManageRecords
{
    protected static string $resource = HealthcareResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false),
        ];
    }
}
