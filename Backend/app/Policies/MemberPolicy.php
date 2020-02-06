<?php

namespace App\Policies;

use App\Member;
use App\Repositories\MemberRepository;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MemberPolicy
{
    use HandlesAuthorization;

    protected $memberRepo;
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function join(User $user, $memberable_id, $memberable)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        return !$members->contains(Member::BANNED) && !$members->contains(Member::MEMBER) && !$members->contains(Member::PENDING);
    }

    public function manage(User $user, $memberable_id, $memberable)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        return $members->contains(Member::ADMIN) || $members->contains(Member::MODERATOR);
    }

    public function follow(User $user, $memberable_id, $memberable)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        return !$members->contains(Member::BANNED) && !$members->contains(Member::FOLLOWING);
    }

    public function unfollow(User $user, $memberable_id, $memberable)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        return !$members->contains(Member::BANNED) && $members->contains(Member::FOLLOWING);
    }

    public function appoint(User $user, User $target, $memberable_id, $memberable, $role)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        $target_members = $memberable_type->members->where('user_id', $target->id)->pluck('status');
        return $members->contains(Member::ADMIN) && !$target_members->contains($role);
    }

    public function discharge(User $user, User $target, $memberable_id, $memberable, $role)
    {
        $memberable_type = $this->memberRepo->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('user_id', $user->id)->pluck('status');
        $target_members = $memberable_type->members->where('user_id', $target->id)->pluck('status');
        return $members->contains(Member::ADMIN) && $target_members->contains($role);
    }
}
