<?php

namespace App\Filament\Resources\AllJobs\Pages;

use App\Filament\Resources\AllJobs\AllJobResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAllJob extends EditRecord
{
    protected static string $resource = AllJobResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

}
