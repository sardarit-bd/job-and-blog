<?php

namespace App\Filament\Resources\Abouts\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AboutForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('About Information')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Enter title for about me section')
                            ->helperText('e.g., "Sarah Johnson" or "About Our Founder"'),

                        RichEditor::make('description')
                            ->required()
                            ->columnSpanFull()
                            ->placeholder('Enter about description or story')
                            ->helperText('Share your story, background, and what drives you')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'bulletList',
                                'orderedList',
                                'undo',
                                'redo',
                            ]),

                        TextInput::make('experience')
                            ->required()
                            ->maxLength(100)
                            ->placeholder('15+ Years')
                            ->helperText('Years of experience or expertise'),
                    ])
                    ->columnSpan(1)
                    ->columns(1),

                Section::make()
                    ->schema([
                        Section::make('Profile Image')
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->directory('about')
                                    ->disk('public')
                                    ->maxSize(5048)
                                    ->imageEditor()
                                    ->imageEditorAspectRatios([
                                        '1:1',
                                        '4:3',
                                        '16:9',
                                    ])
                                    ->nullable()
                                    ->columnSpanFull()
                                    ->helperText('Recommended size: 800x800px. Max: 5MB'),
                            ]),

                        Section::make('Social Links')
                            ->schema([
                                TextInput::make('x_link')
                                    ->label('X (Twitter) Profile URL')
                                    ->url()
                                    ->maxLength(500)
                                    ->placeholder('https://x.com/username')
                                    ->prefixIcon('heroicon-o-link'),

                                TextInput::make('linkedin_link')
                                    ->label('LinkedIn Profile URL')
                                    ->url()
                                    ->maxLength(500)
                                    ->placeholder('https://linkedin.com/in/username')
                                    ->prefixIcon('heroicon-o-link'),
                            ])
                            ->columns(1),

                        Section::make('Status')
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Active Section')
                                    ->helperText('⚠️ Only one about section can be active at a time.')
                                    ->default(true),
                            ]),
                    ])
                    ->columnSpan(1),
            ]);
    }
}