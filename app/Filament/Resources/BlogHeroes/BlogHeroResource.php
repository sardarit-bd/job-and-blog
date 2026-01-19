<?php

namespace App\Filament\Resources\BlogHeroes;

use App\Filament\Resources\BlogHeroes\Pages\CreateBlogHero;
use App\Filament\Resources\BlogHeroes\Pages\EditBlogHero;
use App\Filament\Resources\BlogHeroes\Pages\ListBlogHeroes;
use App\Filament\Resources\BlogHeroes\Schemas\BlogHeroForm;
use App\Filament\Resources\BlogHeroes\Tables\BlogHeroesTable;
use App\Models\BlogHero;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class BlogHeroResource extends Resource
{
    protected static ?string $model = BlogHero::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-photo';

    protected static string | UnitEnum | null $navigationGroup = 'Blogs Management';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return BlogHeroForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BlogHeroesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBlogHeroes::route('/'),
            'create' => CreateBlogHero::route('/create'),
            'edit' => EditBlogHero::route('/{record}/edit'),
        ];
    }
}
