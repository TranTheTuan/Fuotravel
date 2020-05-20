<?php

namespace App\Repositories;

use App\Relationship;
use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;

class UserRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\User';
    }

    public function loginRules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    public function registerRules()
    {
        return [
            'firstname' => 'required|string|max:20',
            'lastname' => 'required|string|max:20',
            'gender' => 'nullable',
            'birthday'  => 'nullable|date',
            'avatar' => 'nullable|string',
            'name' => 'required|alpha_dash|min:4|max:12',
            'phone' => 'nullable|string',
            'password' => 'required|min:3'
        ];
    }

    public function checkActiveStatus($email, $active)
    {
        $user = $this->findBy('email', $email);
        return $user ? $user->active == $active : false;
    }

    public function sendFriendRequest(array $data)
    {
        $pending = Relationship::create($data);
        return $pending;
    }

    public function unfriend($target_id)
    {
        $user = Auth::user();
        foreach ($user->friends as $friend) {
            $relationship = $friend->pivot;
            if (
                ($relationship->first_user_id == $target_id || $relationship->second_user_id == $target_id)
                && $relationship->status == Relationship::FRIENDS
            ) {
                $relationship->delete();
                return true;
            }
        }
        return false;
    }

    public function acceptFriendRequest($sender_id)
    {
        $user = Auth::user();
        $user->receivedFriendRequests()->updateExistingPivot($sender_id, ['action_user_id' => $user->id, 'status' => Relationship::FRIENDS]);
        return true;
    }

    public function cancelFriendRequest($recipient_id)
    {
        $user = Auth::user();
        $user->sentFriendRequests()->detach($recipient_id);
        return true;
    }

    public function declineFriendRequest($sender_id)
    {
        $user = Auth::user();
        $user->receivedFriendRequests()->detach($sender_id);
        return true;
    }

    public function block($target_id)
    {
        $user = Auth::user();
        $friend = $user->friends->where('id', $target_id)->first();
        $block = NULL;
        if ($friend) {
            $block = $friend->pivot->update(['status' => Relationship::BLOCKED, 'action_user_id' => Auth::id()]);
            return $block;
        }
        $block = Relationship::create(['first_user_id' => Auth::id(),
            'second_user_id' => $target_id,
            'status' => Relationship::BLOCKED,
            'action_user_id' => Auth::id()]);
        return $block;
    }
}
