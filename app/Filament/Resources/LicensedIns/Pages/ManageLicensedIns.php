<?php

namespace App\Filament\Resources\LicensedIns\Pages;

use App\Filament\Resources\LicensedIns\LicensedInResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageLicensedIns extends ManageRecords
{
    protected static string $resource = LicensedInResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false),
        ];
    }
}
