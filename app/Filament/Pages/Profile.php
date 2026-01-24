<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Section;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class Profile extends Page
{
    protected string $view = 'filament.pages.profile';
    
    protected static bool $shouldRegisterNavigation = false;
    
    protected ?string $heading = 'My Profile';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $this->data = auth()->user()->toArray();
    }
    
    public function schema(Schema $schema): Schema
    {
        return $schema
            ->components([
                Form::make([
                    Grid::make(['default' => 1, 'lg' => 2])
                        ->schema([
                            Section::make('Personal Information')
                                ->description('Update your personal details')
                                ->schema([
                                    TextInput::make('name')
                                        ->label('Full Name')
                                        ->required()
                                        ->maxLength(255)
                                        ->prefixIcon('heroicon-o-user'),
                                    TextInput::make('email')
                                        ->label('Email Address')
                                        ->email()
                                        ->required()
                                        ->maxLength(255)
                                        ->prefixIcon('heroicon-o-envelope'),
                                ])
                                ->columnSpan(1),
                                
                            Section::make('Security')
                                ->description('Update your password to keep your account secure')
                                ->schema([
                                    TextInput::make('current_password')
                                        ->password()
                                        ->label('Current Password')
                                        ->currentPassword()
                                        ->revealable()
                                        ->prefixIcon('heroicon-o-lock-closed'),
                                    TextInput::make('password')
                                        ->password()
                                        ->label('New Password')
                                        ->minLength(8)
                                        ->confirmed()
                                        ->revealable()
                                        ->prefixIcon('heroicon-o-key')
                                        ->helperText('Minimum 8 characters'),
                                    TextInput::make('password_confirmation')
                                        ->password()
                                        ->label('Confirm New Password')
                                        ->revealable()
                                        ->prefixIcon('heroicon-o-lock-closed'),
                                ])
                                ->columnSpan(1),
                        ]),
                        
                    Actions::make([
                        Action::make('save')
                            ->label('Save Changes')
                            ->action('updateProfile')
                            ->color('primary')
                            ->icon('heroicon-o-check-circle'),
                    ])
                    ->alignment('right'),
                ])
                ->statePath('data'),
            ]);
    }
    
    public function updateProfile(): void
    {
        $user = auth()->user();
        
        // Check if user is trying to change password
        $isChangingPassword = !empty($this->data['current_password']) || 
                            !empty($this->data['password']) || 
                            !empty($this->data['password_confirmation']);
        
        // Build validation rules
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 
                'email', 
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id)
            ],
        ];
        
        // Add password validation rules if changing password
        if ($isChangingPassword) {
            $rules['current_password'] = ['required', 'string', 'current_password'];
            $rules['password'] = ['required', 'string', 'min:8', 'confirmed'];
            $rules['password_confirmation'] = ['required', 'string'];
        }
        
        // Validate the data
        try {
            $validated = validator($this->data, $rules)->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Clear password fields on validation error
            $this->data['current_password'] = null;
            $this->data['password'] = null;
            $this->data['password_confirmation'] = null;
            
            // Show notification for password-related errors
            if ($isChangingPassword) {
                $errors = $e->validator->errors();
                
                if ($errors->has('current_password')) {
                    Notification::make()
                        ->title('Password Error')
                        ->body('The current password is incorrect. Please try again.')
                        ->danger()
                        ->send();
                } elseif ($errors->has('password')) {
                    Notification::make()
                        ->title('Password Error')
                        ->body('Please check your new password. It must be at least 8 characters and match the confirmation.')
                        ->danger()
                        ->send();
                }
            }
            
            throw $e;
        }
        
        // Update name and email
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        
        // Update password if provided
        if ($isChangingPassword && isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        
        $user->save();
        
        // Clear password fields after successful save
        $this->data['current_password'] = null;
        $this->data['password'] = null;
        $this->data['password_confirmation'] = null;
        
        Notification::make()
            ->title('Success')
            ->body('Your profile has been updated successfully.')
            ->success()
            ->send();
    }
}