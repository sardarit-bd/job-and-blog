<?php

namespace App\Filament\Resources\AllJobs;

use App\Filament\Resources\AllJobs\Pages\CreateAllJob;
use App\Filament\Resources\AllJobs\Pages\EditAllJob;
use App\Filament\Resources\AllJobs\Pages\ListAllJobs;
use App\Filament\Resources\AllJobs\Schemas\AllJobForm;
use App\Filament\Resources\AllJobs\Tables\AllJobsTable;
use App\Models\AllJob;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AllJobResource extends Resource
{
    protected static ?string $model = AllJob::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBriefcase;

    protected static string | UnitEnum | null $navigationGroup = 'Job';

    public static function form(Schema $schema): Schema
    {
        return AllJobForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AllJobsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPluralLabel(): string
    {
        return 'Jobs';
    }
    
    public static function getPages(): array
    {
        return [
            'index' => ListAllJobs::route('/'),
            'create' => CreateAllJob::route('/create'),
            'edit' => EditAllJob::route('/{record}/edit'),
        ];
    }
}
