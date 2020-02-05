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
        return $this->sendResponse($this->imageRepo->showImages($imageable_id, $imageable));
    }
}
