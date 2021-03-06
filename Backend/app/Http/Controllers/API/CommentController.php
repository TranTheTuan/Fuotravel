<?php

namespace App\Http\Controllers\API;

use App\Comment;
use App\Events\CommentEvent;
use App\Http\Controllers\ApiController;
use App\Repositories\CommentRepository;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class CommentController extends ApiController
{
    const UPLOAD_PATH = 'uploads/comments/';

    protected $commentRepo, $imageService;

    public function __construct(CommentRepository $commentRepo, ImageService $imageService)
    {
        $this->commentRepo = $commentRepo;
        $this->imageService = $imageService;
    }

    public function create(Request $request, $commentable_id, $commentable)
    {
        $data = $request->except('parent_id');
        $data['commentable_id'] = $commentable_id;
        $data['commentable'] = $commentable;
        if($request->has('parent_id')) {
            $data['parent_id'] = $request->parent_id;
        } else {
            $data['parent_id'] = null;
        }
        $data['user_id'] = Auth::id();
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $data['image'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->image);
        }
        $comment = $this->commentRepo->create($data);
        return $this->sendResponse($comment);
    }

    public function show($commentable_id, $commentable)
    {
        return $this->sendResponse($this->commentRepo->showComments($commentable_id, $commentable));
    }

    public function delete($comment_id, $commentable_id, $commentable)
    {
        $this->authorize('delete', [Comment::find($comment_id), $commentable_id, $commentable]);
        $this->commentRepo->delete($comment_id);
        return $this->sendResponse('deleted');
    }
}
