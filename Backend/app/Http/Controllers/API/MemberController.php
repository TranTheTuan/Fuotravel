<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Member;
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

    public function join($memberable_id, $memberable)
    {
        $this->authorize('join', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->join($memberable_id, $memberable));
    }

    public function accept($user_id, $memberable_id, $memberable)
    {
        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->accept($user_id, $memberable_id, $memberable));
    }

    public function decline($user_id, $memberable_id, $memberable)
    {
        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->decline($user_id, $memberable_id, $memberable));
    }

    public function ban($user_id, $memberable_id, $memberable)
    {
        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->ban($user_id, $memberable_id, $memberable));
    }

    public function follow($memberable_id, $memberable)
    {
        $this->authorize('follow', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->follow($memberable_id, $memberable));
    }

    public function unfollow($memberable_id, $memberable)
    {
        $this->authorize('unfollow', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->unfollow($memberable_id, $memberable));
    }

    public function kick($user_id, $memberable_id, $memberable)
    {
        $this->authorize('manage', [Member::class, $memberable_id, $memberable]);

        return $this->sendResponse($this->memberRepo->kick($user_id, $memberable_id, $memberable));
    }

    public function appoint($user_id, $memberable_id, $memberable, $role)
    {
        $this->authorize('appoint', [Member::class, User::find($user_id), $memberable_id, $memberable, $role]);

        return $this->sendResponse($this->memberRepo->appoint($user_id, $memberable_id, $memberable, $role));
    }

    public function discharge($user_id, $memberable_id, $memberable, $role)
    {
        $this->authorize('discharge', [Member::class, User::find($user_id), $memberable_id, $memberable, $role]);

        return $this->sendResponse($this->memberRepo->discharge($user_id, $memberable_id, $memberable, $role));
    }

    public function getRequesters($memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->getRequesters($memberable_id, $memberable));
    }

    public function getMembers($memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->getMembers($memberable_id, $memberable));
    }
}
