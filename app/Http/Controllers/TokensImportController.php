<?php

namespace App\Http\Controllers;

use App\Imports\TokensImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TokensImportController extends Controller
{
    public function tokens(Request $request)
    {
        $userRole = Auth::user()->role;
        $search = $request->input('search');

        // filter untuk AdminSD
        $filterSD = ['4', '5', '6'];
        $filterSMP = ['7', '8', '9'];

        $users = DB::table('token')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('unique_char', 'like', '%' . $search . '%')
                    ->orWhere('token', 'like', '%' . $search . '%')
                    ->orWhere('kelas', 'like', '%' . $search . '%')
                    ->orWhere('ebook', 'like', '%' . $search . '%');
            })
            ->when($userRole === 'AdminSD', function ($query) use ($filterSD) {
                $query->where(function ($q) use ($filterSD) {
                    foreach ($filterSD as $kelas) {
                        $q->orWhere('kelas', 'like', "%$kelas%");
                    }
                });
            })
            ->when($userRole === 'AdminSMP', function ($query) use ($filterSMP) {
                $query->where(function ($q) use ($filterSMP) {
                    foreach ($filterSMP as $kelas) {
                        $q->orWhere('kelas', 'like', "%$kelas%");
                    }
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10) // <-- pagination aktif
            ->withQueryString(); // biar search tetap nyangkut saat pindah halaman

        return Inertia::render('admin/AddTokens', [
            'users' => $users,
            'filters' => [
                'search' => $search, // kirim ke frontend biar input search nggak ilang
            ],
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv'
        ]);

        Excel::import(new TokensImport, $request->file('file'));

        return back()->with('success', 'Excel berhasil diupload dan diproses!');
    }

    public function store(Request $request)
    {
        $user = DB::table('users')->where('unique_char', trim($request->unique_char))->first();

        if (!$user) {
            return back()
                ->withErrors(['nama' => 'Nama tidak ditemukan dalam tabel users.'])
                ->withInput();
        }

        $Kelas = $request->Kelas;
        $Sub_Kelas = $request->Sub_kelas;
        $kelasGabungan = $Kelas . '' . $Sub_Kelas;

        // Penamaan file ebook
        $ebook = trim($request->Ebook);
        $ebookName = $ebook . '_kelas' . $Kelas . '.pdf';

         DB::table('token')->insert([
            'unique_char' => trim($request->unique_char),
            'id_nama' => $user->id, // ID dari tabel users
            'name' => trim($request->Nama),
            'token' => trim($request->Token),
            'kelas' => $kelasGabungan,
            'ebook' => $ebookName,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        return redirect()->route('add-tokens')->with('success', 'Data berhasil disimpan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'Nama'  => 'required|string|max:255',
        ]);

        $Kelas = $request->Kelas;
        $Sub_Kelas = $request->Sub_kelas;
        $kelasGabungan = $Kelas . '' . $Sub_Kelas;

        $ebook = trim($request->input('Ebook'));
        $ebookName = $ebook . '_kelas' . $Kelas . '.pdf';

        DB::table('token')
            ->where('id', $id)
            ->update([
                'unique_char'=> $request->input('unique_char'),
                'name'=> $request->input('Nama'),
                'token'=> $request->input('Token'),
                'kelas'=> $kelasGabungan,
                'ebook'=> $ebookName,
            ]);

        return redirect()
            ->route('add-tokens')
            ->with('success', 'Token Berhasil di Update!');
    }

    public function deleteUsers(Request $request, $id = null)
    {
        if ($id) {
            // Hapus satu user
            DB::table('token')->where('id', $id)->delete();
            return redirect()->route('add-token')->with('success', 'Data berhasil dihapus!');
        } else {
            // Hapus banyak user (kirim lewat request body)
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                DB::table('token')->whereIn('id', $ids)->delete();
            }
            return redirect()->route('manage-token')->with('success', 'Data berhasil dihapus!');
        }
    }

    public function manage(Request $request)
    {
        $userRole = Auth::user()->role;
        $search = $request->input('search');

        // filter untuk AdminSD
        $filterSD = ['4', '5', '6'];
        $filterSMP = ['7', '8', '9'];

        $users = DB::table('token')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('token', 'like', '%' . $search . '%')
                    ->orWhere('ebook', 'like', '%' . $search . '%')
                    ->orWhere('kelas', 'like', '%' . $search . '%');
                });
            })
            ->when($userRole === 'AdminSD', function ($query) use ($filterSD) {
                $query->where(function ($q) use ($filterSD) {
                    foreach ($filterSD as $kelas) {
                        $q->orWhere('kelas', 'like', "%$kelas%");
                    }
                });
            })
            ->when($userRole === 'AdminSMP', function ($query) use ($filterSMP) {
                $query->where(function ($q) use ($filterSMP) {
                    foreach ($filterSMP as $kelas) {
                        $q->orWhere('kelas', 'like', "%$kelas%");
                    }
                });
            })
            ->orderBy('id', 'desc')
            ->get(); // aktifkan pagination

        return Inertia::render('admin/ManageTokens', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

}
