<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;
use App\Plan;

class PlanRepository extends AbstractRepository
{
    const UPLOAD_PATH = 'uploads/plan/';

	public function model()
    {
        return 'App\Plan';
    }

    public function creatingRules()
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:1000',
            'cover' => 'required|string',
            'departure' => 'required|string',
            'start_at' => 'required|date',
            'destination' => 'required|string',
            'arrival_at' => 'requried|date',
            'members_quantity' => 'required|numeric|min:2'
        ];
    }

    public function uploadCover($file)
    {
        $fileName = time() . '.' . $file->getClientOriginalExtension();

        $file->move(self::UPLOAD_PATH, $fileName);

        return self::UPLOAD_PATH . $fileName;
    }

    public function create(array $data)
    {
        $user = Auth::user();
        return $user->plans()->create($data);
    }

    public function updateStatus($plan_id)
    {
        $plan = $this->find($plan_id);
        $status = $plan->status;
        if($status < Plan::END) {
            $plan->status = $status + 1;
            return $plan->save();
        }
        return false;
    }

    public function cancel($plan_id)
    {
        $plan = $this->find($plan_id);
        if($plan->status == Plan::PLANNING) {
            $plan->status = Plan::CANCELED;
            return $plan->save();
        }
        return false;
    }

}