<?php

namespace App\Http\Controllers;

use App\Models\Drawing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DrawingController extends Controller
{
    public function index()
    {
        $drawing = Drawing::when(Auth::check(), fn($q) => $q->where('user_id', Auth::id()))
            ->latest()
            ->first();

        if ($drawing) {
            $data = json_decode($drawing->data, true);

            // Periksa apakah 'document' ada dan apakah 'document.name' valid
            if (isset($data['document']) && (!isset($data['document']['name']) || $data['document']['name'] === null)) {
                $data['document']['name'] = 'Untitled';
            }

            $drawing->data = $data;
        }

        return response()->json($drawing);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'data'  => 'required|array',
        ]);

        array_walk_recursive($data['data'], function (&$value, $key) {
            if ($value === null || $value === "null") {
                switch ($key) {
                    case 'name':
                        $value = "Untitled";
                        break;
                    case 'url':
                        $value = "";
                        break;
                    case 'crop':
                        $value = [
                            "topLeft" => ["x" => 0, "y" => 0],
                            "bottomRight" => ["x" => 1, "y" => 1],
                        ];
                        break;
                    default:
                        $value = "";
                }
            }
        });

        $drawing = Drawing::create([
            'user_id' => Auth::id(),
            'title'   => $data['title'] ?? 'My board',
            'data'    => json_encode($data['data']),
        ]);

        return response()->json(['ok' => true, 'id' => $drawing->id]);
        
    }
}