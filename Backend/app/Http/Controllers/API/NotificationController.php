<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends ApiController
{
    public function index()
    {
        $user = Auth::user();
        return $this->sendResponse(NotificationResource::collection($user->receivers));
    }

    public function markAsRead($notificationId)
    {
        $user = Auth::user();
        $user->receivers()->updateExistingPivot($notificationId, ['read_at' => Carbon::now()]);
        return $this->sendResponse(NotificationResource::collection($user->receivers));
    }

    public function markAsUnread($notificationId)
    {
        $user = Auth::user();
        $user->receivers()->updateExistingPivot($notificationId, ['read_at' => null]);
        return $this->sendResponse(NotificationResource::collection($user->receivers));
    }

    public function markAllAsRead()
    {
        $user = Auth::user();
        foreach ($user->receivers as $receiver) {
            $receiver->pivot->read_at = Carbon::now();
            $receiver->pivot->save();
        }
        return $this->sendResponse(NotificationResource::collection($user->receivers));
    }
}
