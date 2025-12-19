<?php

namespace App\Filament\Resources\AllJobs\Schemas;

use App\Models\Company;
use App\Models\Experience;
use App\Models\JobType;
use App\Models\Schedule;
use App\Models\LicensedIn;
use App\Models\Speciality;
use Illuminate\Support\Str;
use App\Models\LicensedType;
use App\Models\RemoteStatus;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Illuminate\Database\Eloquent\Builder;

class AllJobForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('company_id')
                ->label('Company')
                ->relationship('company', 'name', fn (Builder $query) => $query->where('user_id', auth()->id()))
                ->required(),
                
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                        if ($operation === 'create') {
                            $baseSlug = Str::slug($state);
                            $uniqueSuffix = base_convert(round(microtime(true) * 1000), 10, 36);
                            $set('slug', $baseSlug . '-' . $uniqueSuffix);
                        }
                    }),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->disabled()
                    ->dehydrated(fn ($state) => filled($state)),

                Select::make('license_type')
                    ->required()
                    ->options(
                        LicensedType::query()
                            ->pluck('name', 'name')
                            ->toArray()
                    ),

                Select::make('licensed_ins')
                    ->label('Licensed In')
                    ->required()
                    ->multiple()
                    ->preload()
                    ->relationship('jobLicensedIns', 'name'),

                Select::make('jobTypes')
                    ->relationship('jobTypes', 'name')
                    ->multiple()
                    ->preload()
                    ->required(),


                Select::make('jobWorkFroms')
                    ->label('Work From')
                    ->multiple()
                    ->preload()
                    ->relationship('jobWorkFroms', 'name'),

                Select::make('remoteStatus')
                    ->multiple()
                    ->preload()
                    ->relationship('jobRemoteStatuses', 'name'),

                Select::make('experiences')
                    ->multiple()
                    ->relationship('experiences', 'title')
                    ->preload(),

                Select::make('schedule')
                    ->options(
                        Schedule::query()
                            ->pluck('name', 'name')
                            ->toArray()
                    ),

                Select::make('salaray_transparency')
                    ->options(['Yes' => 'Yes', 'No' => 'No'])
                    ->default('No')
                    ->required(),

                TextInput::make('salary_range')
                    ->label('Salary Range')
                    ->placeholder('e.g., $50000 - $80000')
                    ->helperText('Enter salary as Low – High'),

                Select::make('specialities')
                    ->relationship('specialities', 'name')
                    ->multiple()
                    ->preload()
                    ->required(),

                RichEditor::make('description')
                    ->required()
                    ->columnSpanFull()
                    ->extraInputAttributes([
                        // 'class' => 'min-h-[300px] h-auto overflow-hidden prose',
                        'style' => 'height:auto !important;',
                        'class' => 'prose max-w-none',
                    ]),

                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('jobs')   
                    ->imagePreviewHeight('250')
                    ->panelLayout('integrated')
                    ->columnSpanFull(),
            ]);
    }
}
