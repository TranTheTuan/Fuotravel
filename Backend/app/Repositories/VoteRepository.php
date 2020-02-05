<?php

namespace App\Repositories;

use App\Comment;
use App\Post;
use App\Repositories\BaseRepositories\AbstractRepository;
use App\Vote;
use Illuminate\Support\Facades\Auth;

class VoteRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Vote';
    }

    public function upvote($voteable_id, $voteable)
    {
        $voteable_type = $this->checkVoteableType($voteable_id, $voteable);
        $voteable_type->votes()->updateOrCreate(
            ['user_id' => Auth::id()],
            ['vote_type' => Vote::UP]);
        $vote = $this->getVoteCount($voteable_type);
        $voteable_type->update(['vote' => $vote]);
        return $vote;
    }

    public function downvote($voteable_id, $voteable)
    {
        $voteable_type = $this->checkVoteableType($voteable_id, $voteable);
        $voteable_type->votes()->updateOrCreate(
            ['user_id' => Auth::id()],
            ['vote_type' => Vote::DOWN]);
        $vote = $this->getVoteCount($voteable_type);
        $voteable_type->update(['vote' => $vote]);
        return $vote;
    }

    private function getVoteCount($voteable_type)
    {
        $upvote = $voteable_type->votes()->where('vote_type', Vote::UP)->count();
        $downvote = $voteable_type->votes()->where('vote_type', Vote::DOWN)->count();
        $vote = $upvote - $downvote;

        return $vote;
    }

    private function checkVoteableType($voteable_id, $voteable)
    {
        if ($voteable == Vote::POST) {
            return Post::find($voteable_id);
        }
        return Comment::find($voteable_id);
    }
}
