<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EbookController extends Controller
{
    public function ebooks(Request $request)
    {
        $search = $request->input('search');
        $users = DB::table('ebook')
            ->when($search, function ($query, $search) {
                $query->where('ebook', 'like', '%' . $search . '%')
                    ->orWhere('author', 'like', '%' . $search . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/AddEbook', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function Store(Request $request)
    {

        // Debug: cek file yang diterima
        // dd($request->all(), $request->hasFile('cover'), $request->hasFile('File_pdf'));
        
        $request->validate([
            'cover' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'File_pdf' => 'required|mimes:pdf|max:10240',
            'Author' => 'required|string',
            'Ebook' => 'required|string',
            'Kelas' => 'required|string',
        ]);

        $author = $request->Author;
        $ebook = $request->Ebook;
        $kelas = $request->Kelas;
        
        // PERBAIKAN: Gunakan nama field yang benar sesuai frontend
        $cover = $request->file('cover');        // ✅ BENAR: 'cover' (huruf kecil)
        $file_pdf = $request->file('File_pdf');  // ✅ BENAR: 'File_pdf' (sesuai frontend)



        // Generate nama file
        $coverName = time() . '_cover_' . $cover->getClientOriginalName();
        $nameFile = $ebook . '_kelas' . $kelas . '.' . $file_pdf->getClientOriginalExtension();

        // Buat folder jika belum ada
        if (!file_exists(public_path('cover'))) {
            mkdir(public_path('cover'), 0755, true);
        }
        if (!file_exists(public_path('file'))) {
            mkdir(public_path('file'), 0755, true);
        }

        // Simpan file ke folder public
        $cover->move(public_path('cover'), $coverName);
        $file_pdf->move(public_path('file'), $nameFile);

        // Simpan ke database
        DB::table('ebook')->insert([
            'ebook' => $ebook,
            'author' => $author,
            'kelas' => $kelas,
            'cover' => $coverName,
            'file_pdf' => $nameFile,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return back()->with('success', 'File berhasil diupload!');
        return back()->withErrors($e->errors())->withInput();

    }

    public function deleteUsers($id)
    {
        DB::table('ebook')->where('id', $id)->delete();
        return redirect()->route('add-ebook')->with('success', 'Data Berhasil dihapus!');
    }
}