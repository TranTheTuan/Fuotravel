<?php

namespace App\Policies;

use App\Comment;
use App\Member;
use App\Repositories\CommentRepository;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    protected $commentRepo;
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(CommentRepository $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function delete(User $user, Comment $comment, $commentable_id, $commentable)
    {
        $commentable_type = $this->commentRepo->checkCommentableType($commentable_id, $commentable);
        $member = $commentable_type->members->where('user_id', $user->id);
        return $comment->user_id == $user->id || $commentable_type->user_id == $user->id || $member->pluck('status')->contains(Member::ADMIN);
    }
}
