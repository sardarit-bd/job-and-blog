<?php

namespace App\Filament\Resources\Abouts\Pages;

use App\Models\About;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\Abouts\AboutResource;

class CreateAbout extends CreateRecord
{
    protected static string $resource = AboutResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if ($data['is_active'] ?? false) {
            About::query()->update(['is_active' => false]);
        }
        
        return $data;
    }

    protected function getFormActions(): array
    {
        return [
            $this->getCreateFormAction(),
            $this->getCancelFormAction(),
        ];
    }
}
