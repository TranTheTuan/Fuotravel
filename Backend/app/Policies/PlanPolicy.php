<?php

namespace App\Policies;

use App\Group;
use App\Member;
use App\Plan;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PlanPolicy
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

    public function view(User $user, Plan $plan)
    {
        $member = $plan->members->where('user_id', $user->id)->first();
        return is_null($member) || $member->status != Member::BANNED;
    }

    public function create(User $user, Group $group)
    {
        $member = $group->members->where('user_id', $user->id);
        return $member->pluck('status')->contains(Member::MEMBER);
    }

    public function update(User $user, Plan $plan)
    {
        $member = $plan->members->where('user_id', $user->id);
        return $plan->user_id == $user->id || $member->pluck('status')->contains(Member::ADMIN);
    }

    public function delete(User $user, Plan $plan)
    {
        return $plan->user_id == $user->id;
    }
}
