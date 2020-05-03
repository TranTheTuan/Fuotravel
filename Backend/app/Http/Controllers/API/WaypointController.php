<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Waypoint;
use Illuminate\Http\Request;

class WaypointController extends ApiController
{
    public function __invoke(Request $request, $planId)
    {
        $data = $request->all();
        Waypoint::where('plan_id', $planId)->delete();
        foreach ($data['waypoints'] as $waypoint) {
            $waypoint['plan_id'] = $planId;
            Waypoint::create($waypoint);
        }
        return $this->sendResponse('update plan waypoints');
    }
}
