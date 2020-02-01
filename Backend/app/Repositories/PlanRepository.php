<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;
use App\Plan;
use App\Member;

class PlanRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Plan';
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
