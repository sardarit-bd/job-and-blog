<?php

namespace App\Filament\Resources\BlogHeroes\Pages;

use App\Models\BlogHero;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\BlogHeroes\BlogHeroResource;

class EditBlogHero extends EditRecord
{
    protected static string $resource = BlogHeroResource::class;

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
        // If this hero is being set as active, deactivate all others
        if ($data['is_active'] ?? false) {
            BlogHero::where('id', '!=', $this->record->id)
                ->update(['is_active' => false]);
        }
        
        return $data;
    }
}
