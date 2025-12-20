<?php

namespace App\Filament\Resources\AllJobs;

use UnitEnum;
use BackedEnum;
use App\Models\AllJob;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\AllJobs\Pages\EditAllJob;
use App\Filament\Resources\AllJobs\Pages\ListAllJobs;
use App\Filament\Resources\AllJobs\Pages\CreateAllJob;
use App\Filament\Resources\AllJobs\Schemas\AllJobForm;
use App\Filament\Resources\AllJobs\Tables\AllJobsTable;

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
        return AllJobsTable::configure($table)
            ->modifyQueryUsing(fn (Builder $query) => $query->with([
                'jobTypes',
                'jobLicensedIns',
                'specialities',
                'experiences',
                'jobRemoteStatuses',
                'jobWorkFroms'
            ]));
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

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();

        return $data;
    }
}
