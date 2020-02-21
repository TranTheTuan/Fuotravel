<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Repositories\VoteRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Vote;

class VoteController extends ApiController
{
    protected $voteRepo;

    public function __construct(VoteRepository $voteRepo)
    {
        $this->voteRepo = $voteRepo;
    }

    public function upvote($voteable_id, $voteable)
    {
        return $this->sendResponse($this->voteRepo->vote($voteable_id, $voteable, Vote::UP));
    }

    public function downvote($voteable_id, $voteable)
    {
        return $this->sendResponse($this->voteRepo->vote($voteable_id, $voteable, Vote::DOWN));
    }
}
