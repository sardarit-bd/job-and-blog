<?php

namespace App\Filament\Resources\AllJobs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AllJobsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('license_type')
                    ->searchable(),
                TextColumn::make('jobTypes.name')
                    ->badge()
                    ->label('Job Types')
                    ->listWithLineBreaks()
                    ->limitList(3),
                TextColumn::make('schedule')
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
                TextColumn::make('specialities.name')
                    ->label('Specializations')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->color('info'),

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
