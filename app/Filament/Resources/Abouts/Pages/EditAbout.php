<?php

namespace App\Filament\Resources\Abouts\Pages;

use App\Models\About;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\Abouts\AboutResource;

class EditAbout extends EditRecord
{
    protected static string $resource = AboutResource::class;

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

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($data['is_active'] ?? false) {
            About::where('id', '!=', $this->record->id)
                ->update(['is_active' => false]);
        }
        
        return $data;
    }
}
