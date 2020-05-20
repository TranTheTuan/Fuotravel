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

    public function getProfile($user_id)
    {
        return $this->sendResponse(User::find($user_id));
    }

    public function sentFriendRequests()
    {
        return $this->sendResponse(Auth::user()->sentFriendRequests);
    }

    public function getFriends($user_id)
    {
        $user = User::find($user_id);
        return $this->sendResponse($user->friends);
    }

    public function getFriendRequests()
    {
        return $this->sendResponse(Auth::user()->receivedFriendRequests);
    }

    public function unfriend($target_id)
    {
        $isSuccess = $this->userRepo->unfriend($target_id);
        if ($isSuccess) {
            return $this->sendResponse($isSuccess);
        }
        return $this->sendError(__('api/api.friend_request_not_found'));
    }

    public function acceptFriendRequest($sender_id)
    {
        $isAccepted = $this->userRepo->acceptFriendRequest($sender_id);
        if ($isAccepted) {
            return $this->sendResponse($isAccepted);
        }
        return $this->sendError(__('api/api.friend_request_not_found'));
    }

    public function cancelFriendRequest($recipient_id)
    {
        $isCancel = $this->userRepo->cancelFriendRequest($recipient_id);
        if ($isCancel) {
            return $this->sendResponse($isCancel);
        }
        return $this->sendError(__('api/api.friend_request_not_found'));
    }

    public function declineFriendRequest($sender_id)
    {
        $isDeclined = $this->userRepo->declineFriendRequest($sender_id);
        if ($isDeclined) {
            return $this->sendResponse($isDeclined);
        }
        return $this->sendError(__('api/api.friend_request_not_found'));
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
