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

    public function acceptFriendRequest($sender_id)
    {
        $user = Auth::user();
        $request = $user->receivedFriendRequests()->where('first_user_id', $sender_id)->first();
        $request->update(['action_user_id' => $user->id, 'status' => Relationship::FRIENDS]);

        return $request;
    }

    public function cancelFriendRequest($sender_id)
    {
        $user = Auth::user();
        $user->receivedFriendRequests()->where('first_user_id', $sender_id)->first()->delete();
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
