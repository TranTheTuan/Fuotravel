<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use App\Services\ImageService;
use Illuminate\Container\Container as App;
use Illuminate\Support\Facades\Auth;
use App\Post;
use App\Plan;
use App\Group;
use App\Http\Resources\PostResource;

class PostRepository extends AbstractRepository
{
    protected $imageService;

	public function model()
    {
        return 'App\Post';
    }

    public function create(array $data)
    {
        $postable_type = $this->checkPostableType($data['postable_id'], $data['postable']);
        $post = $postable_type->posts()->create(['caption' => $data['caption'], 'user_id' => Auth::id()]);
        return $post;
    }

    public function delete($post_id)
    {
        $post = Post::find($post_id);
        $post->images()->delete();
        $post->delete();
        return true;
    }

    public function getByPostableType($postable_id, $postable)
    {
        $postable_type = $this->checkPostableType($postable_id, $postable);
        // return $postable_type->posts->each(function($post, $index) {
        //     return $post->user;
        // });
        return PostResource::collection($postable_type->posts);
    }

    public function checkPostableType($postable_id, $postable)
    {
        if($postable == Post::PLAN) {
            return Plan::find($postable_id);
        }
        return Group::find($postable_id);
    }
}
