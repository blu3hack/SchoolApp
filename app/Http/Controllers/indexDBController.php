<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Inertia\Inertia;

class indexDBController extends Controller
{
    public function index()
    {
        $pdfs = DB::table('token')->get();
        return response()->json($pdfs);
    }

    public function insertDB() {
        return Inertia::render('indexDB/InsertDB');
    }

    public function test() {
        return Inertia::render('indexDB/InsertDB');
    }
}
