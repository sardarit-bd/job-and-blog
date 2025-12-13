<?php

namespace App\Filament\Resources\AllJobs\Pages;

use App\Filament\Resources\AllJobs\AllJobResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAllJob extends CreateRecord
{
    protected static string $resource = AllJobResource::class;

    public function getTitle(): string
    {
        return 'Create A Job';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
