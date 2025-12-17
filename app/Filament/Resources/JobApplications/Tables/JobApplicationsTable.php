<?php

namespace App\Filament\Resources\JobApplications\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class JobApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Applicant Name')
                    ->sortable(),

                TextColumn::make('job.title')
                    ->label('Job Title')
                    ->sortable(),

                TextColumn::make('user.resume_path')
                    ->label('Resume')
                    ->formatStateUsing(fn ($state) => 'View Resume')
                    ->url(fn ($record) => $record->user->resume_path ? asset('storage/' . $record->user->resume_path) : null)
                    ->openUrlInNewTab()
                    ->color('primary')
                    ->icon('heroicon-o-document-text')
                    ->tooltip('Open resume in new tab')
                    ->default('-')
                    ->placeholder('No resume uploaded'),

                TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'hired',
                        'danger'  => 'rejected',
                        'primary' => 'shortlisted',
                    ])
                    ->icons([
                        'heroicon-o-clock'     => 'pending',
                        'heroicon-o-check-circle' => 'hired',
                        'heroicon-o-x-circle'   => 'rejected',
                    ]),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
