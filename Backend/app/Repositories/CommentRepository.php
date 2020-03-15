<?php

namespace App\Repositories;

use App\Comment;
use App\Group;
use App\Plan;
use App\Post;
use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CommentResource;

class CommentRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Comment';
    }

    public function create(array $data)
    {
        $commentable_type = $this->checkCommentableType($data['commentable_id'], $data['commentable']);
        unset($data['commentable']);
        $comment = $commentable_type->comments()->create($data);
        return new CommentResource($comment);
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
        $parents = $commentable_type->comments->where('parent_id', null);
        return CommentResource::collection($parents);
    }

    public function showReplies($comment_id)
    {
        return Comment::find($comment_id)->comments;
    }

    public function checkCommentableType($commentable_id, $commentable)
    {
        if($commentable == Comment::PLAN) {
            return Plan::find($commentable_id);
        }
        return Post::find($commentable_id);
    }
}
