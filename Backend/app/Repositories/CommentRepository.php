<?php

namespace App\Repositories;

use App\Comment;
use App\Group;
use App\Plan;
use App\Post;
use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;

class CommentRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Comment';
    }

    public function create(array $data)
    {
        $commentable_type = $this->checkCommentableType($data);
        return $commentable_type->comments()->create(['content' => $data['content'], 'parent_id' => $data['parent_id'], 'user_id' => Auth::id()]);
    }

    public function delete($comment_id)
    {
        $comment = Comment::find($comment_id);
        $comment->images()->delete();
        $comment->delete();
        return true;
    }

    public function showComments($commentable_id, $commentable)
    {
        $commentable_type = $this->checkCommentableType($commentable_id, $commentable);
        return $commentable_type->comments;
    }

    private function checkCommentableType($commentable_id, $commentable)
    {
        if($commentable == Comment::PLAN) {
            return Plan::find($commentable_id);
        }
        return Post::find($commentable_id);
    }
}
