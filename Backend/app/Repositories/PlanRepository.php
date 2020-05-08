<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Plan;
use App\Member;

class PlanRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Plan';
    }

    public function filter($data)
    {
        $plans = DB::table('plans')
            ->leftJoin('taggables', function($join) {
                $join->on('plans.id', '=', 'taggables.taggable_id')
                    ->where('taggables.taggable_type', 'LIKE', '%Plan%');
            })
            ->join('tags', 'taggables.tag_id', '=', 'tags.id')
            ->select('plans.*')->distinct();
        if (isset($data['query'])) {
            $plans = $plans->where('title', 'LIKE', '%'.$data['query'].'%');
        }
        if (isset($data['tags'])) {
            $tagsArr = \explode('.', $data['tags']);
            $plans = $plans->whereIn('tag_id', $tagsArr);
        }
        return $plans->get();
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

    public function getByGroups($group_id)
    {
        $group = Group::find($group_id);
        return $group->plans;
    }
}
