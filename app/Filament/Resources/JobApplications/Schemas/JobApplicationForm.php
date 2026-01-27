<?php

namespace App\Filament\Resources\JobApplications\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class JobApplicationForm
{

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Applicant')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                
                Select::make('all_job_id')
                    ->label('Job')
                    ->relationship('job', 'title') 
                    ->searchable()
                    ->preload()
                    ->required(),
                
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'shortlisted' => 'Shortlisted',
                        'rejected' => 'Rejected',
                        'hired' => 'Hired',
                    ])
                    ->default('pending')
                    ->required(),
            ]);
    }
}
