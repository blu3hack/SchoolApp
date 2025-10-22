<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = DB::table('users')->count();
        $totalEbooks = DB::table('ebook')->count();
        $totalTokens = DB::table('token')->count();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'totalUsers' => $totalUsers,
            'totalEbooks' => $totalEbooks,
            'totalTokens' => $totalTokens,
        ]);

    }

    public function test() {
        return Inertia::render('Index');
    }
}

