<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;

class CompanyAboutController extends Controller
{
    public function show ($id)
    {
        $company = Company::findOrFail($id);

        return Inertia::render('CompanyAbout', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'logo' => $company->image ? asset('storage/' . $company->image) : null,
                'description' => $company->description,
                'email' => $company->email,
                'address' => $company->address,
                'website' => $company->website,
            ]
        ]);
    }
}
