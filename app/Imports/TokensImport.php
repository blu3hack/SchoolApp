<?php
namespace App\Imports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Session;


class TokensImport implements ToCollection, WithHeadingRow
{
   public function collection(Collection $rows)
    {
        $errors = [];

        foreach ($rows as $index => $row) {
            $uniqueChar = trim($row['unique_char'] ?? '');
            $nama       = trim($row['name'] ?? '');

            // Cari user berdasarkan unique_char
            $user = DB::table('users')->where('unique_char', $uniqueChar)->first();

            if (!$user) {
                $errors[] = "Baris " . ($index + 2) . ": Unique Char '{$uniqueChar}' milik '{$nama}' tidak ditemukan dalam tabel users.";
                continue;
            }

            DB::table('token')->insert([
                'unique_char' => $uniqueChar,
                'name'        => $nama,
                'id_nama'     => $user->id,
                'token'       => $row['token'] ?? null,
                'kelas'       => $row['kelas'] ?? null,
                'ebook'       => $row['ebook'] ?? null,
            ]);
        }

        // Simpan error ke session
        if (!empty($errors)) {
            Session::flash('import_errors', $errors);
        }
    }
}