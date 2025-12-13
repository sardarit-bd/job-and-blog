<?php

namespace App\Filament\Resources\AllJobs\Pages;

use App\Filament\Resources\AllJobs\AllJobResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAllJobs extends ListRecords
{
    protected static string $resource = AllJobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false),
        ];
    }
}
