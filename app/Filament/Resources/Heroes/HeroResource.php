<?php

namespace App\Filament\Resources\Heroes;

use UnitEnum;
use BackedEnum;
use App\Models\Hero;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Actions\EditAction;
use Filament\Resources\Resource;
use Filament\Actions\DeleteAction;
use Filament\Support\Icons\Heroicon;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use App\Filament\Resources\Heroes\Pages\ManageHeroes;

class HeroResource extends Resource
{
    protected static ?string $model = Hero::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string | UnitEnum | null $navigationGroup = 'Settings';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                RichEditor::make('heading')
                    ->label('Main Heading')
                    ->required()
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'bold', 'italic', 'underline', 'h2', 'h3',
                        'bulletList', 'orderedList',
                        'textColor',
                    ])
                    ->customTextColors()
                    ->hint('Use the color picker to highlight words like "Remote Nursing" in orange.'),
                    

                TextInput::make('sub_heading')
                    ->label('Sub Heading')
                    ->required(),

                TextInput::make('moto'),
                FileUpload::make('image')
                    ->disk('public')
                    ->directory('heroes')
                    ->image()
                    ->imageEditor()
                    ->imageEditorAspectRatios([
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxSize(10240)
                    ->previewable(true)
                    ->downloadable()
                    ->openable()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('heading')
                    ->limit(50)
                    ->searchable(),

                TextColumn::make('sub_heading')
                    ->limit(50)
                    ->searchable(),

                TextColumn::make('moto')
                    ->limit(50)
                    ->searchable(),

                ImageColumn::make('image'),
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
            'index' => ManageHeroes::route('/'),
        ];
    }
}
