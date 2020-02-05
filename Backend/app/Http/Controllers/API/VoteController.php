<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Repositories\VoteRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends ApiController
{
    protected $voteRepo;

    public function __construct(VoteRepository $voteRepo)
    {
        $this->voteRepo = $voteRepo;
    }

    public function upvote($voteable_id, $voteable)
    {
        $data['voteable_id'] = $voteable_id;
        $data['voteable'] = $voteable;

        return $this->sendResponse($this->voteRepo->upvote($data));
    }

    public function downvote($voteable_id, $voteable)
    {
        $data['voteable_id'] = $voteable_id;
        $data['voteable'] = $voteable;

        return $this->sendResponse($this->voteRepo->downvote($data));
    }
}
