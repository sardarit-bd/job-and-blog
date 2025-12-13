<?php

namespace App\Filament\Resources\LicensedTypes\Pages;

use App\Filament\Resources\LicensedTypes\LicensedTypeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLicensedType extends EditRecord
{
    protected static string $resource = LicensedTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    public function getRedirectUrl(): ?string
    {
        return $this->getResource()::getUrl('index');
    }
}
