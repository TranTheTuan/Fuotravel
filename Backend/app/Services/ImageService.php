<?php

namespace App\Services;

class ImageService
{
    public function uploadImage($path, $file, $index = NULL)
    {
        $fileName = time() . $index . '.' . $file->getClientOriginalExtension();

        $file->move($path, $fileName);

        return $path . $fileName;
    }
}