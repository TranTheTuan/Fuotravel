<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Relationship;
use App\Repositories\UserRepository;
use App\Services\ImageService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends ApiController
{
    protected $userRepo, $imageService;
    const UPLOAD_PATH = 'uploads/avatar/';

    public function __construct(UserRepository $userRepo, ImageService $imageService)
    {
        $this->userRepo = $userRepo;
        $this->imageService = $imageService;
    }

    public function sendFriendRequest($recipient_id)
    {
        $data['first_user_id'] = Auth::id();
        $data['second_user_id'] = $recipient_id;
        $data['action_user_id'] = Auth::id();

        return $this->sendResponse($this->userRepo->sendFriendRequest($data));
    }

    public function updateAvatar(Request $request, $userId) {
        $user = User::find($userId);
        if (!$user) {
            return $this->sendError(__('api/api.user_not_found'));
        }
        $data['avatar'] = '';
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $data['avatar'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('avatar'));
        }
        $user->avatar = $data['avatar'];
        $user->save();
        return $this->sendResponse($data['avatar']);
    }

    public function updateProfile(Request $request, $userId) {
        $user = User::find($userId);
        if (!$user) {
            return $this->sendError(__('api/api.user_not_found'));
        }
        $data = $request->all();
        $user->update($data);
        return $this->sendResponse(__('api/api.updated'));
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
