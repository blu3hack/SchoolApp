<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassEbookController extends Controller
{
    public function ClassEbook()
    {
        $userClass = Auth::user()->Kelas;
        $userID = Auth::user()->id;

        $ebooks = DB::table('ebook')
            ->when($userClass, function ($query, $userClass) {
                if (str_contains($userClass, '4')) {
                    $query->where('kelas', 4);
                }
                if (str_contains($userClass, '5')) {
                    $query->where('kelas', 5);
                }
                if (str_contains($userClass, '6')) {
                    $query->where('kelas', 6);
                }
                if (str_contains($userClass, '7')) {
                    $query->where('kelas', 7);
                }
                if (str_contains($userClass, '8')) {
                    $query->where('kelas', 8);
                }
                if (str_contains($userClass, '9')) {
                    $query->where('kelas', 9);
                }
            })
            ->get();

        // 1. Pisahkan dengan koma atau spasi
        $kelasParts = preg_split('/[\s,]+/', $userClass); // ["7A", "8C", "4", "5"]

        // 2. Ambil angka saja
        $kelasNumbers = array_map(function($part) {
            preg_match('/\d+/', $part, $matches);
            return $matches[0] ?? null;
        }, $kelasParts);

        // 3. Hapus null jika ada
        $kelasNumbers = array_filter($kelasNumbers);

        // 4. Reset index
        $kelasNumbers = array_values($kelasNumbers);
        return Inertia::render('ClassEbook/PageClass', [
            'ebooks' => $ebooks,
            'class' => $kelasNumbers,
            'usersID' => $userID,
        ]);
    }

    public function sendtoken(Request $request) 
    {
        $validated = $request->validate([
            'token' => 'required|string|max:255',
            'file_pdf' => 'required|string|max:255',
            'id_nama' => 'required|max:255',
        ]);

        $token = $validated['token'];
        $id_nama = $validated['id_nama'];
        $file_pdf = $validated['file_pdf'];

        $data = DB::table('token')
        ->select('name', 'id_nama', 'token', 'ebook')
        ->where('token', $token)
        ->first();

       if (!$data) {
            throw ValidationException::withMessages([
                'token' => 'Token tidak ditemukan',
            ]);
        }

        if ($id_nama != $data->id_nama) {
            throw ValidationException::withMessages([
                'token' => 'Token tidak sesuai User',
            ]);
        }

        if ($file_pdf != $data->ebook) {
            throw ValidationException::withMessages([
                'token' => 'Token tidak sesuai Ebook',
            ]);
        }

        // Redirect dengan data di URL
        return redirect('/flipbook?' . http_build_query($validated));
    }

    public function index() {
        return Inertia::render('Index');
    }
}
