<?php

namespace App\Helpers;

class AssetVersion
{
    public static function get()
    {
        $manifestPath = public_path('build/manifest.json');

        if (file_exists($manifestPath)) {
            return md5_file($manifestPath); // buat hash dari isi manifest
        }

        return null;
    }
}
