<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Repositories\GroupRepository;
use App\Repositories\MemberRepository;
use App\Services\ImageService;
use Illuminate\Http\Request;

class MemberController extends ApiController
{
    protected $memberRepo;

    public function __construct(MemberRepository $memberRepo)
    {
        $this->memberRepo = $memberRepo;
    }

    public function join($memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->join($memberable_id, $memberable));
    }

    public function accept($user_id, $memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->accept($user_id, $memberable_id, $memberable));
    }

    public function ban($user_id, $memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->ban($user_id, $memberable_id, $memberable));
    }

    public function follow($memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->follow($memberable_id, $memberable));
    }

    public function unfollow($memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->unfollow($memberable_id, $memberable));
    }

    public function kick($user_id, $memberable_id, $memberable)
    {
        return $this->sendResponse($this->memberRepo->kick($user_id, $memberable_id, $memberable));
    }
}
