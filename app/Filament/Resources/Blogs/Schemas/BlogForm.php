<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Illuminate\Support\Str;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Blog Information')
                    ->schema([
                        Select::make('category_id')
                            ->relationship('category', 'name')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Category'),

                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Set $set) {
                                if ($operation === 'create') {
                                    $baseSlug = Str::slug($state);
                                    $uniqueNumber = rand(1000, 9999); // Random 4-digit number
                                    $slug = $baseSlug . '-' . $uniqueNumber;
                                    
                                    $set('slug', $slug);
                                }
                            })
                            ->placeholder('Enter blog title'),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->placeholder('auto-generated-slug')
                            ->helperText('Leave empty to auto-generate from title')
                            ->default(fn () => Str::slug(fake()->words(3, true)) . '-' . rand(1000, 9999)),
                    ])
                    ->columns(2),

                    Section::make('Featured Image')
                    ->schema([
                        FileUpload::make('image')
                            ->image()
                            ->directory('blogs')
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(5048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->nullable()
                            ->columnSpanFull()
                            ->helperText('Allowed types: JPG, JPEG, PNG, GIF, WEBP. Maximum size: 5MB'),
                    ]),

                Section::make('Content')
                    ->schema([
                        RichEditor::make('description')
                            ->required()
                            ->columnSpanFull()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, Set $set) {
                                $wordCount = str_word_count(strip_tags($state));
                                $readingTime = max(1, ceil($wordCount / 200));
                                $set('reading_time', $readingTime);
                            })
                            ->placeholder('Write your blog content here...')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'link',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                                'codeBlock',
                                'undo',
                                'redo',
                            ]),

                        Placeholder::make('reading_time_display')
                            ->label('Estimated Reading Time')
                            ->content(function (Get $get) {
                                $readingTime = $get('reading_time') ?? 0;
                                return $readingTime > 0 
                                    ? "{$readingTime} minute" . ($readingTime > 1 ? 's' : '')
                                    : 'Start writing to calculate...';
                            })
                            ->columnSpanFull(),

                        Hidden::make('reading_time')
                            ->default(1),
                    ]),

                
            ]);
    }
}