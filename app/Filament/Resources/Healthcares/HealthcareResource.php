<?php

namespace App\Filament\Resources\Healthcares;

use BackedEnum;
use App\Models\Healthcare;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use Filament\Actions\DeleteAction;
use Filament\Support\Icons\Heroicon;
use Filament\Actions\BulkActionGroup;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Components\Grid;
use Filament\Actions\DeleteBulkAction;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use App\Filament\Resources\Healthcares\Pages\ManageHealthcares;

class HealthcareResource extends Resource
{
    protected static ?string $model = Healthcare::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('industry_id')
                    ->required()
                    ->default(6),
        

                Grid::make(1)
                ->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    TextInput::make('administrator')
                        ->maxLength(255),
                ]),

                Repeater::make('rn')
                ->label('Registered Nurses')
                ->schema([
                    TextInput::make('name')
                        ->label('RN')
                        ->required(),
                ])
                ->columns(1)
                ->addActionLabel('Add RN'),

            Repeater::make('physician')
                ->label('Physicians')
                ->schema([
                    TextInput::make('name')
                        ->label('Physician Name')
                        ->required(),
                ])
                ->columns(1)
                ->addActionLabel('Add Physician'),

            Repeater::make('allied_health')
                ->label('Allied Health')
                ->schema([
                    TextInput::make('name')
                        ->label('Allied Health Professional')
                        ->required(),
                ])
                ->columns(1)
                ->addActionLabel('Add Allied Health'),
                   
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                    
                TextColumn::make('rn')
                    ->badge()
                    ->getStateUsing(fn ($record) => collect($record->rn)->pluck('name')->filter()->toArray())
                    ->separator(', '),

                TextColumn::make('physician')
                    ->badge()
                    ->color('success')
                    ->getStateUsing(fn ($record) => collect($record->physician)->pluck('name')->filter()->toArray())
                    ->separator(', '),

                TextColumn::make('allied_health')
                    ->badge()
                    ->color('warning')
                    ->getStateUsing(fn ($record) => collect($record->allied_health)->pluck('name')->filter()->toArray())
                    ->separator(', '),

                TextColumn::make('administrator')
                    ->searchable(),
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

    public static function getPages(): array
    {
        return [
            'index' => ManageHealthcares::route('/'),
        ];
    }
}
