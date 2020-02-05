<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Repositories\CommentRepository;
use App\Services\ImageService;
use App\Services\VoteService;
use Illuminate\Http\Request;

class CommentController extends ApiController
{
    const UPLOAD_PATH = 'uploads/comments';

    protected $commentRepo, $imageService;

    public function __construct(CommentRepository $commentRepo, ImageService $imageService)
    {
        $this->commentRepo = $commentRepo;
        $this->imageService = $imageService;
    }

    public function create(Request $request, $commentable_id, $commentable)
    {
        $data = $request->all();
        $data['commentable_id'] = $commentable_id;
        $data['commentable'] = $commentable;
        $comment = $this->commentRepo->create($data);

        if($data['images']) {
            foreach($data['images'] as $index => $image) {
                if($image->isValid()) {
                    $path = $this->imageService->uploadImage(self::UPLOAD_PATH, $image, $index);
                    $comment->images()->create(['path' => $path]);
                }
            }
        }
        return $this->sendResponse($comment);
    }

    public function show($commentable_id, $commentable)
    {
        $data['commentable_id'] = $commentable_id;
        $data['commentable'] = $commentable;

        return $this->sendResponse($this->commentRepo->showComments($data));
    }

    public function delete($comment_id)
    {
        $this->commentRepo->delete($comment_id);
        return $this->sendResponse('deleted');
    }
}
