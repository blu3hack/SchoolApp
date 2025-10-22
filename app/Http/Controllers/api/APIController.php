<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class APIController extends Controller
{
    public function index()
    {
        $pdfs = DB::table('token')->get();
        return response()->json($pdfs);
    }
}
