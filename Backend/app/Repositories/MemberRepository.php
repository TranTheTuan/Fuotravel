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

    public function join(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $memberable_type->members()->create(['user_id' => Auth::id()]);
        $memberable_type->members()->create(['user_id' => Auth::id(), 'status' => Member::FOLLOWING]);
        return true;
    }

    public function accept(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $request_member = $memberable_type->members->where('status', Member::PENDING)->where('user_id', $data['user_id'])->first();
        $request_member->update(['status' => Member::MEMBER]);
        return $request_member;
    }

    public function ban(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $member_ids = $memberable_type->members->where('user_id', $data['user_id'])->pluck('id');
        Member::whereIn('id', $member_ids)->delete();
        $banned_member = $memberable_type->members()->create(['user_id' => $data['user_id'], 'status' => Member::BANNED]);
        return $banned_member;
    }

    public function unfollow(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $user_id = Auth::id();
        $unfollow_member = $memberable_type->members->where('user_id', $user_id)->where('status', Member::FOLLOWING)->first();
        Member::find($unfollow_member->id)->delete();
        return true;
    }

    public function follow(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $user_id = Auth::id();
        $following_member = $memberable_type->members()->create(['user_id' => $user_id, 'status' => Member::FOLLOWING]);
        return $following_member;
    }

    public function kick(array $data)
    {
        $memberable_type = $this->checkMemberableType($data);
        $member_ids = $memberable_type->members->where('user_id', $data['user_id'])->pluck('user_id');
        Member::whereIn('id', $member_ids)->delete();
        return true;
    }

    private function checkMemberableType($data)
    {
        $memberable_type = NULL;
        if($data['memberable'] == Member::PLAN) {
            $memberable_type = Plan::find($data['memberable_id']);
        } else {
            $memberable_type = Group::find($data['memberable_id']);
        }
        return $memberable_type;
    }
}
