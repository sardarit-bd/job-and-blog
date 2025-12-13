<?php

namespace App\Filament\Resources\RemoteStatuses\Pages;

use App\Filament\Resources\RemoteStatuses\RemoteStatusResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageRemoteStatuses extends ManageRecords
{
    protected static string $resource = RemoteStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->createAnother(false),
        ];
    }
}
