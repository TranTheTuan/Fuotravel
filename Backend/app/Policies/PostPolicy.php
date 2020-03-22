<?php

namespace App\Policies;

use App\Member;
use App\Post;
use App\Repositories\PostRepository;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    protected $postRepo;
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(PostRepository $postRepo)
    {
        $this->postRepo = $postRepo;
    }

//    public function create(User $user, $postable_id, $postable)
//    {
//        $postable_type = $this->postRepo->checkPostableType($postable_id, $postable);
//        $member = $postable_type->members->where('user_id', $user->id);
//        return $member->pluck('status')->contains(Member::MEMBER);
//    }

    public function update(User $user, Post $post)
    {
        return $post->user_id == $user->id;
    }
}
