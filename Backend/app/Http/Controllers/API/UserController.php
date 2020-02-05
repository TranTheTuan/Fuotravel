<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Relationship;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends ApiController
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function sendFriendRequest($recipient_id)
    {
        $data['first_user_id'] = Auth::id();
        $data['second_user_id'] = $recipient_id;
        $data['action_user_id'] = Auth::id();

        return $this->sendResponse($this->userRepo->sendFriendRequest($data));
    }

    public function sentFriendRequests()
    {
        return $this->sendResponse(Auth::user()->sentFriendRequests());
    }

    public function getFriends()
    {
        return $this->sendResponse(Auth::user()->friends);
    }

    public function getFriendRequests()
    {
        return $this->sendResponse(Auth::user()->receivedFriendRequests);
    }

    public function acceptFriendRequest($sender_id)
    {
        return $this->sendResponse($this->userRepo->acceptFriendRequest($sender_id));
    }

    public function cancelFriendRequest($sender_id)
    {
        return $this->sendResponse($this->userRepo->cancelFriendRequest($sender_id));
    }

    public function blockedFriends()
    {
        return $this->sendResponse(Auth::user()->blocked_friends);
    }

    public function block($target_id)
    {
        return $this->sendResponse($this->userRepo->block($target_id));
    }
}
