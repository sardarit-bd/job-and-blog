<?php

namespace App\Filament\Resources\LicensedTypes\Pages;

use App\Filament\Resources\LicensedTypes\LicensedTypeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLicensedTypes extends ListRecords
{
    protected static string $resource = LicensedTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false),
        ];
    }
}
