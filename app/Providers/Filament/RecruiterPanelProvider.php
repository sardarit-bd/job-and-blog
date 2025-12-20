<?php

namespace App\Providers\Filament;

use Filament\Panel;
use Filament\PanelProvider;
use Filament\Pages\Dashboard;
use Filament\Support\Colors\Color;
use App\Filament\Widgets\TotalJobs;
use App\Filament\Widgets\JobPostsChart;
use Filament\Http\Middleware\Authenticate;
use App\Filament\Widgets\JobApplicantsChart;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Filament\Http\Middleware\AuthenticateSession;
use DiogoGPinto\AuthUIEnhancer\AuthUIEnhancerPlugin;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;

class RecruiterPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('recruiter')
            ->path('recruiter')
            ->viteTheme('resources/css/filament/recruiter/theme.css')
            ->sidebarWidth('16rem')
            ->maxContentWidth('full')
            ->login()
            ->registration()
            ->passwordReset()
            ->authGuard('web')
            ->colors([
                'primary' => Color::Blue,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                TotalJobs::class,
                JobPostsChart::class,
                JobApplicantsChart::class,
            ])
            ->plugins([
                AuthUIEnhancerPlugin::make()
                    ->emptyPanelBackgroundImageUrl('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
                    ->showEmptyPanelOnMobile(false)
                    ->emptyPanelBackgroundImageOpacity('70%')
                    ->formPanelWidth('60%')
                    ->formPanelPosition('left')
                    ->formPanelBackgroundColor(Color::hex('#f0f0f0')),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->viteTheme('resources/css/filament/recruiter/theme.css')
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
