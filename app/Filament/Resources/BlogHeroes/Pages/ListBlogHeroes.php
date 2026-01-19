<?php

namespace App\Filament\Resources\BlogHeroes\Pages;

use App\Filament\Resources\BlogHeroes\BlogHeroResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBlogHeroes extends ListRecords
{
    protected static string $resource = BlogHeroResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
