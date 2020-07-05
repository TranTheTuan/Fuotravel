<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\AcceptPlanJoinRequestEvent;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NotificationResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use App\Notification;
use App\Member;

class AcceptPlanJoinRequestListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(AcceptPlanJoinRequestEvent $event)
    {
        try {
            $redis = Redis::connection();
            $member = $event->member;
            $plan = $member->plan;
            $sender = Auth::user();
            $roomType = Notification::USER_ROOM;
            $roomId = $member->user_id;
            $message = 'Your request to join plan ' . $plan->title . ' is accepted';
            $link = '/plans/' . $plan->id . '/members';
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => $roomType,
                'room_id' => $roomId,
                'link' => $link
            ]);
            $notification->receivers()->attach($member->user_id);
            $redis->publish('send-message', \json_encode(new NotificationResource($notification)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
