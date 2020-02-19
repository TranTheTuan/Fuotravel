<?php

namespace App\Repositories;

use App\Group;
use App\Member;
use App\Plan;
use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;

class MemberRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Member';
    }

    public function join($memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $memberable_type->members()->create(['user_id' => Auth::id()]);
        $memberable_type->members()->create(['user_id' => Auth::id(), 'status' => Member::FOLLOWING]);
        return true;
    }

    public function accept($user_id, $memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $request_member = $memberable_type->members->where('status', Member::PENDING)->where('user_id', $user_id)->first();
        $request_member->update(['status' => Member::MEMBER]);
        return $request_member;
    }

    public function ban($user_id, $memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $member_ids = $memberable_type->members->where('user_id', $user_id)->pluck('id');
        Member::whereIn('id', $member_ids)->delete();
        $banned_member = $memberable_type->members()->create(['user_id' => $user_id, 'status' => Member::BANNED]);
        return $banned_member;
    }

    public function unfollow($memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $user_id = Auth::id();
        $unfollow_member = $memberable_type->members->where('user_id', $user_id)->where('status', Member::FOLLOWING)->first();
        Member::find($unfollow_member->id)->delete();
        return true;
    }

    public function follow($memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $user_id = Auth::id();
        $following_member = $memberable_type->members()->create(['user_id' => $user_id, 'status' => Member::FOLLOWING]);
        return $following_member;
    }

    public function kick($user_id, $memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $member_ids = $memberable_type->members->where('user_id', $user_id)->pluck('user_id');
        Member::whereIn('user_id', $member_ids)->delete();
        return true;
    }

    public function appoint($user_id, $memberable_id, $memberable, $role)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $memberable_type->members()->create(['user_id' => $user_id, 'status' => $role]);
        return true;
    }

    public function discharge($user_id, $memberable_id, $memberable, $role)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $member_id = $memberable_type->members->where('user_id', $user_id)->where('status', $role)->pluck('id');
        Member::whereIn('id', $member_id)->delete();
        return true;
    }

    public function getRequesters($memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $requesters = $memberable_type->members->where('status', Member::PENDING)->each(function($requester, $key) {
            return $requester->user;
        })->pluck('user');
        return $requesters;
    }

    public function getMembers($memberable_id, $memberable)
    {
        $memberable_type = $this->checkMemberableType($memberable_id, $memberable);
        $members = $memberable_type->members->where('status', Member::MEMBER)->each(function($requester, $key) {
            return $requester->user;
        })->pluck('user');
        return $members;
    }

    public function checkMemberableType($memberable_id, $memberable)
    {
        $memberable_type = NULL;
        if($memberable == Member::PLAN) {
            $memberable_type = Plan::find($memberable_id);
        } else {
            $memberable_type = Group::find($memberable_id);
        }
        return $memberable_type;
    }
}
