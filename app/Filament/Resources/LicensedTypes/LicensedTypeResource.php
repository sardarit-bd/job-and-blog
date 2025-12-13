<?php

namespace App\Filament\Resources\LicensedTypes;

use App\Filament\Resources\LicensedTypes\Pages\CreateLicensedType;
use App\Filament\Resources\LicensedTypes\Pages\EditLicensedType;
use App\Filament\Resources\LicensedTypes\Pages\ListLicensedTypes;
use App\Filament\Resources\LicensedTypes\Schemas\LicensedTypeForm;
use App\Filament\Resources\LicensedTypes\Tables\LicensedTypesTable;
use App\Models\LicensedType;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class LicensedTypeResource extends Resource
{
    protected static ?string $model = LicensedType::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedKey;

    protected static string | UnitEnum | null $navigationGroup = 'License';

    public static function form(Schema $schema): Schema
    {
        return LicensedTypeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LicensedTypesTable::configure($table);
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
            'index' => ListLicensedTypes::route('/'),
            // 'create' => CreateLicensedType::route('/create'),
            'edit' => EditLicensedType::route('/{record}/edit'),
        ];
    }
}
