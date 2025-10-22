<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class annotationController extends Controller
{
    public function index()
    {
        return Inertia::render('annotation/draw');
    }
}
