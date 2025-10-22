<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
abstract class Controller
{
    public function index() {
         return Inertia::render('Index');
    }
}
