<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Repositories\MemberRepository;
use Illuminate\Http\Request;
use App\Plan;
use App\Repositories\PlanRepository;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\PlanRequest;
use App\Services\ImageService;

class PlanController extends ApiController
{
    const UPLOAD_PATH = 'uploads/plan/';

    protected $planRepo, $memberRepo, $imageService;

    public function __construct(PlanRepository $planRepo, MemberRepository $memberRepo, ImageService $imageService)
    {
        $this->planRepo = $planRepo;
        $this->memberRepo = $memberRepo;
        $this->imageService = $imageService;
    }

    public function index()
    {
        return $this->sendResponse($this->planRepo->all());
    }

    public function show($plan_id)
    {
        return $this->sendResponse($this->planRepo->find($plan_id));
    }

    public function create(PlanRequest $request)
    {
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        return $this->sendResponse($this->planRepo->create($data));
    }

    public function update(PlanRequest $request, $plan_id)
    {
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        return $this->sendResponse($this->planRepo->update($data, $plan_id));
    }

    public function delete($plan_id)
    {
        $this->planRepo->delete($plan_id);
        return $this->sendResponse(__('api/api.deleted'));
    }

    public function updateStatus($plan_id)
    {
       return $this->sendResponse($this->planRepo->updateStatus($plan_id));
    }

    public function cancel($plan_id)
    {
        return $this->sendResponse($this->planRepo->cancel($plan_id));
    }

    public function join(Request $request, $plan_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        return $this->sendResponse($this->memberRepo->join($data));
    }

    public function accept(Request $request, $plan_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->accept($data));
    }

    public function ban(Request $request, $plan_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->ban($data));
    }

    public function follow(Request $request, $plan_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        return $this->sendResponse($this->memberRepo->follow($data));
    }

    public function unfollow(Request $request, $plan_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        return $this->sendResponse($this->memberRepo->unfollow($data));
    }

    public function kick(Request $request, $plan_id, $user_id)
    {
        $data = $request->all();
        $data['memberable_id'] = $plan_id;
        $data['user_id'] = $user_id;
        return $this->sendResponse($this->memberRepo->kick($data));
    }
}
