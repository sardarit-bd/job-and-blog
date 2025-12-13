<?php

namespace App\Filament\Resources\LicensedTypes\Pages;

use App\Filament\Resources\LicensedTypes\LicensedTypeResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLicensedType extends CreateRecord
{
    protected static string $resource = LicensedTypeResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
