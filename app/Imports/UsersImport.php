<?php
namespace App\Imports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;


class UsersImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            DB::table('users')->insert([
                'unique_char' => $row['unique_char'],
                'Username' => $row['username'],
                'Password' => Hash::make($row['password']),
                'Kelas' => $row['kelas'],
                'Nama' => $row['nama'],
                'role' => $row['role'],
            ]);
        }
    }
}