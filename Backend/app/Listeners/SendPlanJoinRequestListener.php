<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\SendPlanJoinRequestEvent;
use App\Http\Resources\NotificationResource;
use Illuminate\Support\Facades\Redis;
use App\Notification;
use App\Member;

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
        $member = $event->member;
        $plan = $member->plan;
        $sender = $member->user;
        $roomType = Notification::PLAN_ROOM;
        $roomId = $member->plan_id;
        $message = $sender->firstname . ' ' .$sender->lastname . ' sent join request to plan ' . $plan->title;
        $link = '/plans/' . $plan->id . '/requests';
        $notification = $sender->notifications()->create([
            'message' => $message,
            'room_type' => $roomType,
            'room_id' => $roomId,
            'link' => $link
        ]);
        $receiver_ids = $plan->members()->whereIn('status', [Member::ADMIN, Member::MODERATOR])->pluck('user_id');
        $notification->receivers()->attach($receiver_ids);
        Redis::publish('send-message', \json_encode(new NotificationResource($notification)));
    }
}
