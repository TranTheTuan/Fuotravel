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

    public function upvote(array $data)
    {
        $voteable_type = $this->checkVoteableType($data);
        $voteable_type->votes()->updateOrCreate(
            ['user_id' => Auth::id()],
            ['vote_type' => Vote::UP]);
        $vote = $this->getVoteCount($data);
        $voteable_type->update(['vote' => $vote]);
        return $vote;
    }

    public function downvote(array $data)
    {
        $voteable_type = $this->checkVoteableType($data);
        $voteable_type->votes()->updateOrCreate(
            ['user_id' => Auth::id()],
            ['vote_type' => Vote::DOWN]);
        $vote = $this->getVoteCount($data);
        $voteable_type->update(['vote' => $vote]);
        return $vote;
    }

    private function getVoteCount(array $data)
    {
        $voteable_type = $this->checkVoteableType($data);
        $upvote = $voteable_type->votes()->where('vote_type', Vote::UP)->count();
        $downvote = $voteable_type->votes()->where('vote_type', Vote::DOWN)->count();
        $vote = $upvote - $downvote;

        return $vote;
    }

    private function checkVoteableType(array $data)
    {
        if ($data['voteable'] == Vote::POST) {
            return Post::find($data['voteable_id']);
        }
        return Comment::find($data['voteable_id']);
    }
}
