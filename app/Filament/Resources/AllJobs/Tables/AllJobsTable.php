<?php

namespace App\Filament\Resources\AllJobs\Tables;

use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class AllJobsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id')
                    ->hidden()
                    ->default(auth()->user()->id),

                TextColumn::make('title')
                    ->searchable(),

                TextColumn::make('jobTypes.name')
                    ->badge()
                    ->label('Job Types')
                    ->listWithLineBreaks()
                    ->limitList(3),

                TextColumn::make('jobLicensedIns.name')
                    ->label('Licensed In')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->color('secondary'),

                TextColumn::make('license_type')
                    ->searchable(),

                TextColumn::make('experiences.title')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->searchable(),

                TextColumn::make('specialities.name')
                    ->label('Specializations')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->color('info'),
                
                TextColumn::make('schedule')
                    ->searchable(),

                TextColumn::make('jobRemoteStatuses.name')
                    ->label('Remote Status')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->searchable(),

                TextColumn::make('salaray_transparency')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Yes' => 'success', 
                        'No' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('salary_range')
                    ->searchable(),
                

                ImageColumn::make('image')
                    ->disk('public')
                    ->circular(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make()
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
