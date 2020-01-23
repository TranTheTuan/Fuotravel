<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use App\Services\ImageService;
use Illuminate\Container\Container as App;
use Illuminate\Support\Facades\Auth;
use App\Post;
use App\Plan;
use App\Group;

class PostRepository extends AbstractRepository
{
    protected $imageService;

	public function model()
    {
        return 'App\Post';
    }

    public function create(array $data)
    {
        $postable_type = $this->checkPostableType($data);
        return $postable_type->posts()->create(['caption' => $data['caption'], 'user_id' => $data['user_id']]);
    }

    private function checkPostableType($data)
    {
        $postable_type = NULL;
        if($data['memberable'] == Post::PLAN) {
            $postable_type = Plan::find($data['postable_id']);
        } else {
            $postable_type = Group::find($data['postable_id']);
        }
        return $postable_type;
    }
}
