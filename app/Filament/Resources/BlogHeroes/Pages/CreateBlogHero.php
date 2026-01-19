<?php

namespace App\Filament\Resources\BlogHeroes\Pages;

use App\Models\BlogHero;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\BlogHeroes\BlogHeroResource;

class CreateBlogHero extends CreateRecord
{
    protected static string $resource = BlogHeroResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // If this hero is being set as active, deactivate all others
        if ($data['is_active'] ?? false) {
            BlogHero::query()->update(['is_active' => false]);
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
