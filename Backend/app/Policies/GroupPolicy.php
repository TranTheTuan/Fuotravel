<?php

namespace App\Policies;

use App\Group;
use App\Member;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Group $group)
    {
        $member = $group->members->where('user_id', $user->id)->first();
        return !$member || $member->status != Member::BANNED;
    }

    public function update(User $user, Group $group)
    {
        $member = $group->members->where('user_id', $user->id);
        return $group->user_id == $user->id || $member->pluck('status')->contains(Member::ADMIN);
    }
}
