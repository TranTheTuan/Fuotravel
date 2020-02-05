<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Repositories\ImageRepository;
use Illuminate\Http\Request;

class ImageController extends ApiController
{
    protected $imageRepo;

    public function __construct(ImageRepository $imageRepo)
    {
        $this->imageRepo = $imageRepo;
    }

    public function show($imageable_id, $imageable)
    {
        $data['imageable_id'] = $imageable_id;
        $data['imageable'] = $imageable;

        return $this->sendResponse($this->imageRepo->showImages($data));
    }
}
