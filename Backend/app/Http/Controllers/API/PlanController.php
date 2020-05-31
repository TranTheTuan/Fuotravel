<?php

namespace App\Http\Controllers\API;

use App\Group;
use App\Http\Controllers\ApiController;
use App\Repositories\MemberRepository;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;
use App\Plan;
use App\Member;
use App\Tag;
use App\Repositories\PlanRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\PlanRequest;
use App\Services\ImageService;

class PlanController extends ApiController
{
    const UPLOAD_PATH = 'uploads/plan/';

    protected $planRepo, $memberRepo, $tagRepo, $imageService;

    public function __construct(
        PlanRepository $planRepo,
        MemberRepository $memberRepo,
        TagRepository $tagRepo,
        ImageService $imageService)
    {
        $this->planRepo = $planRepo;
        $this->memberRepo = $memberRepo;
        $this->tagRepo = $tagRepo;
        $this->imageService = $imageService;
    }

    public function index(Request $request)
    {
        return $this->sendResponse($this->planRepo->filter($request->all()));
    }

    public function getPlansByMemberStatus(Request $request)
    {
        return $this->sendResponse($this->planRepo->getPlansByMemberStatus($request->status, $request->user_id));
    }

    public function show($plan_id)
    {
        $this->authorize('view', Plan::find($plan_id));
        $plan = $this->planRepo->find($plan_id);
        $plan->tags = $this->tagRepo->showTags($plan_id, Tag::PLAN);
        return $this->sendResponse($plan);
    }

    public function create(PlanRequest $request)
    {
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity', 'group_id']);

        if($request->hasFile('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        $newPlan = $this->planRepo->create($data);
        $newPlan->members()->create(['user_id' => Auth::id(), 'status' => Member::ADMIN]);

        return $this->sendResponse($newPlan);
    }

    public function update(PlanRequest $request, $plan_id)
    {
        $this->authorize('update', Plan::find($plan_id));
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        return $this->sendResponse($this->planRepo->update($data, $plan_id));
    }

    public function delete($plan_id)
    {
        $this->authorize('delete', Plan::find($plan_id));
        $this->planRepo->delete($plan_id);
        return $this->sendResponse(__('api/api.deleted'));
    }

    public function updateStatus($plan_id)
    {
        $this->authorize('update', Plan::find($plan_id));
        return $this->sendResponse($this->planRepo->updateStatus($plan_id));
    }

    public function cancel($plan_id)
    {
        $this->authorize('update', Plan::find($plan_id));
        return $this->sendResponse($this->planRepo->cancel($plan_id));
    }

    public function getWaypoints($plan_id)
    {
        $plan = Plan::find($plan_id);
        return $this->sendResponse($plan->waypoints);
    }
}
