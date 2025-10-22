<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\UsersImport;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserImportController extends Controller
{
    public function users(Request $request)
    {
        $userRole = Auth::user()->role;
        $search = $request->input('search');

        // filter untuk AdminSD
        $filterSD = ['4', '5', '6'];
        $filterSMP = ['7', '8', '9'];

        $users = DB::table('users')
            ->when($search, function ($query, $search) {
                $query->where('Nama', 'like', '%' . $search . '%')
                    ->orWhere('Kelas', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%');
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

        return Inertia::render('admin/AddUser', [
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

        Excel::import(new UsersImport, $request->file('file'));

        return back()->with('success', 'Excel berhasil diupload dan diproses!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'Username' => 'required|unique:users,Username',
            'Password' => 'required',
        ]);

        $Kelas = $request->Kelas;
        $Sub_Kelas = $request->Sub_kelas;
        $kelasGabungan = $Kelas . '' . $Sub_Kelas;

        DB::table('users')->insert([
            'unique_char'  => $request->unique_char,
            'Username'  => $request->Username,
            'Password'   => Hash::make($request->Password),
            'Kelas' => $kelasGabungan,
            'Nama' => $request->Nama,
            'role' => $request->role,
            'updated_at' => now(),
            'created_at' => now(),
        ]);
        return redirect()->route('add-users')->with('success', 'Data berhasil disimpan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'Nama'  => 'required|string|max:255',
        ]);

        $Kelas = $request->Kelas;
        $Sub_Kelas = $request->Sub_kelas;
        $kelasGabungan = $Kelas . '' . $Sub_Kelas;

        DB::table('users')
            ->where('id', $id)
            ->update([
                'Nama'=> $request->input('Nama'),
                'Username'=> $request->input('Username'),
                'Kelas'=> $kelasGabungan,
                'role'=> $request->input('role'),
            ]);

        return redirect()
            ->route('add-users')
            ->with('success', 'User updated successfully!');
    }

    public function deleteUsers(Request $request, $id = null)
    {
        if ($id) {
            // Hapus satu user
            DB::table('users')->where('id', $id)->delete();
            return redirect()->route('add-users')->with('success', 'Data berhasil dihapus!');
        } else {
            // Hapus banyak user (kirim lewat request body)
            $ids = $request->input('ids', []);
            if (!empty($ids)) {
                DB::table('users')->whereIn('id', $ids)->delete();
            }
            return redirect()->route('manage-user')->with('success', 'Data berhasil dihapus!');
        }
    }

    public function manage(Request $request)
    {
        // Ambil semua data ebook tanpa pagination
        $userRole = Auth::user()->role;
        $search = $request->input('search');

        // filter untuk AdminSD
        $filterSD = ['4', '5', '6'];
        $filterSMP = ['7', '8', '9'];

        $users = DB::table('users')
            ->when($search, function ($query, $search) {
                $query->where('Nama', 'like', '%' . $search . '%')
                    ->orWhere('Kelas', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%');
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
            ->get(); // <-- pagination aktif

        return Inertia::render('admin/ManageUsers', [
            'users' => $users,
            'filters' => [
                'search' => $search, // kirim ke frontend biar input search nggak ilang
            ],
        ]);
    }
}
