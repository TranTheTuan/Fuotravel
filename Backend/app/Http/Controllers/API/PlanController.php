<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Plan;
use App\Repositories\PlanRepository;
use Illuminate\Support\Facades\Validator;

class PlanController extends ApiController
{
    protected $planRepo;

    public function __construct(PlanRepository $planRepo)
    {
        $this->planRepo = $planRepo;
    }

    public function index()
    {
        return $this->sendResponse($this->planRepo->all());
    }

    public function show($plan_id)
    {
        return $this->sendResponse($this->planRepo->find($plan_id));
    }

    public function create(Request $request)
    {
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->planRepo->uploadCover($request->file('cover'));
        }

        return $this->sendResponse($this->planRepo->create($data));
    }

    public function update(Request $request, $plan_id)
    {
        $data = $request->only(['title', 'description', 'departure', 'start_at', 'destination', 'arrival_at', 'members_quantity']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->planRepo->uploadCover($request->file('cover'));
        }

        $this->planRepo->update($data, $plan_id);

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


}
