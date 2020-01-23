<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ImageService;
use App\Repositories\PostRepository;
use App\Http\Controllers\ApiController;
use App\Image;

class PostController extends ApiController
{
    const UPLOAD_PATH = 'uploads/post';
    protected $postRepo, $imageService;

    public function __construct(PostRepository $postRepo, ImageService $imageService)
    {
        $this->postRepo = $postRepo;
        $this->imageService = $imageService;
    }

    public function create(Request $request, $postable_id)
    {
        $data = $request->all();
        $data['postable_id'] = $postable_id;
        $post = $this->postRepo->create($data);

        if($data['images']) {
            foreach($data['images'] as $index => $image) {
                if($image->isValid()) {
                    $path = $this->imageService->uploadImage(self::UPLOAD_PATH, $image, $index);
                    $post->images()->create(['path' => $path]);
                }
            }
        }
        return $this->sendResponse($post);
    }

    public function update(Request $request, $post_id)
    {
        $data = $request->all();
        $post = $this->postRepo->update($data, $post_id);
        return $this->sendResponse($post);
    }
}
