<?php

namespace App\Filament\Resources\BlogHeroes\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BlogHeroForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Hero Content')
                    ->schema([
                        RichEditor::make('title')
                            ->label('Hero Title')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'textColor',
                            ])
                            ->customTextColors()
                            ->placeholder('Enter hero title')
                            ->helperText('Use the text color button to highlight specific words (e.g., "Blogs Worth Reading" - make "Reading" orange).'),

                        Textarea::make('moto')
                            ->required()
                            ->rows(3)
                            ->placeholder('Enter hero description or motto')
                            ->helperText('Brief description or tagline for the blog section'),
                    ])
                    ->columns(1),

                Section::make('Hero Image')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->directory('blog-hero')
                            ->disk('public')
                            ->maxSize(5048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->nullable()
                            ->columnSpanFull()
                            ->helperText('Recommended size: 1200x800px. Max: 5MB'),
                    ]),

                Section::make('Status')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Active Hero')
                            ->helperText('⚠️ Only one hero can be active at a time. Activating this will deactivate others.')
                            ->default(true),
                    ]),
            ]);
    }
}