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

    public function join(Request $request, $memberable_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        return $this->sendResponse($this->memberRepo->join($data));
    }

    public function accept(Request $request, $memberable_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->accept($data));
    }

    public function ban(Request $request, $memberable_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->ban($data));
    }

    public function follow(Request $request, $memberable_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        return $this->sendResponse($this->memberRepo->follow($data));
    }

    public function unfollow(Request $request, $memberable_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        return $this->sendResponse($this->memberRepo->unfollow($data));
    }

    public function kick(Request $request, $memberable_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $memberable_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->kick($data));
    }
}
