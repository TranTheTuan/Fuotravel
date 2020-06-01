<?php

namespace App\Http\Controllers\API;

use App\Events\CreatedPostEvent;
use App\Http\Resources\PostResource;
use App\Plan;
use App\Post;
use App\Member;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ImageService;
use App\Repositories\PostRepository;
use App\Http\Controllers\ApiController;

class PostController extends ApiController
{
    const UPLOAD_PATH = 'uploads/post/';
    protected $postRepo, $imageService;

    public function __construct(PostRepository $postRepo, ImageService $imageService)
    {
        $this->postRepo = $postRepo;
        $this->imageService = $imageService;
    }

    public function index($planId)
    {
        try {
            $plan = Plan::find($planId);
            return $this->sendResponse(PostResource::collection($plan->posts));
        } catch(ModelNotFoundException $exception) {
            return $this->sendError('plan not found');
        }
    }

    public function create(Request $request, $planId)
    {
        $data = $request->all();
        $plan = Plan::find($planId);
        $post = $plan->posts()->create([
            'caption' => $data['caption'],
            'user_id' => Auth::id()
        ]);
        if($request->hasFile('images')) {
            foreach($data['images'] as $index => $image) {
                if($image->isValid()) {
                    $path = $this->imageService->uploadImage(self::UPLOAD_PATH, $image, $index);
                    $post->images()->create(['path' => $path]);
                }
            }
        }
        event(new CreatedPostEvent($post));
        return $this->sendResponse(new PostResource($post));
    }

    public function update(Request $request, $postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $this->authorize('update', $post);
            $data = $request->all();
            $post->update($data);
            return $this->sendResponse($post);
        } catch (ModelNotFoundException $exception) {
            return $this->sendError('not found');
        }
    }

    public function delete($postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $this->authorize('update', $post);
            $post->images()->delete();
            $post->delete();
            return $this->sendResponse('deleted');
        } catch (ModelNotFoundException $exception) {
            return $this->sendError('not found');
        }
    }
}
