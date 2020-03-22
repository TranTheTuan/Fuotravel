<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Member;
use App\Plan;
use App\Repositories\MemberRepository;
use App\User;
use Illuminate\Support\Facades\Auth;

class MemberController extends ApiController
{
    protected $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function join($planId)
    {
//        $this->authorize('join', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->join($plan));
    }

    public function accept($user_id, $planId)
    {
//        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->accept($user_id, $plan));
    }

    public function decline($user_id, $planId)
    {
//        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->decline($user_id, $plan));
    }

    public function cancel($user_id, $planId)
    {
//        $this->authorize('cancel', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->cancel($plan));
    }

    public function ban($user_id, $planId)
    {
//        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->ban($user_id, $plan));
    }

    public function follow($planId)
    {
//        $this->authorize('follow', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->follow($plan));
    }

    public function unfollow($planId)
    {
//        $this->authorize('unfollow', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->unfollow($plan));
    }

    public function kick($user_id, $planId)
    {
//        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->kick($user_id, $plan));
    }

    public function appoint($user_id, $planId, $role)
    {
//        $this->authorize('appoint', [Member::class, User::find($user_id), $memberable_id, $memberable, $role]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->appoint($user_id, $plan, $role));
    }

    public function discharge($user_id, $planId, $role)
    {
//        $this->authorize('discharge', [Member::class, User::find($user_id), $memberable_id, $memberable, $role]);
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->discharge($user_id, $plan, $role));
    }

    public function getRequesters($planId)
    {
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->getRequesters($plan));
    }

    public function getMembers($planId)
    {
        $plan = Plan::findOrFail($planId);
        return $this->sendResponse($this->memberRepo->getMembers($plan));
    }
}
