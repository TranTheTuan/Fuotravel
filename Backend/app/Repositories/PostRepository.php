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
}
