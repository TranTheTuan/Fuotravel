<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\SendPlanJoinRequestEvent;
use App\Http\Resources\NotificationResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use App\Notification;
use App\Member;
use App\Plan;

class SendPlanJoinRequestListener
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
    public function handle(SendPlanJoinRequestEvent $event)
    {
        try {
            $redis = Redis::connection();
            $member = $event->member;
            $plan = $member->plan;
            $sender = $member->user;
            $roomType = Notification::USER_ROOM;
            $roomId = $plan->user_id;
            $message = $sender->firstname . ' ' .$sender->lastname . ' sent join request to plan ' . $plan->title;
            $link = '/plans/' . $plan->id . '/requests';
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => $roomType,
                'room_id' => $roomId,
                'link' => $link
            ]);
            $notification->receivers()->attach($plan->user_id);
            $redis->publish('send-message', \json_encode(new NotificationResource($notification)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
