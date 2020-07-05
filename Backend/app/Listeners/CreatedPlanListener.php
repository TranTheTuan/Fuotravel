<?php

namespace App\Listeners;

use App\Events\CreatedPlanEvent;
use App\Http\Resources\NotificationResource;
use App\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class CreatedPlanListener
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
    public function handle(CreatedPlanEvent $event)
    {
        try {
            $redis = Redis::connection();
            $plan = $event->plan;
            $sender = Auth::user();
            $receiver_ids = $sender->friends->pluck('id');
            $message = $sender->firstname . ' ' . $sender->lastname . ' created new plan';
            $link = '/plans/' . $plan->id;
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => Notification::FRIEND_ROOM,
                'room_id' => $sender->id,
                'link' => $link
            ]);
            $notification->receivers()->attach($receiver_ids);
            $redis->publish('send-message', json_encode(new NotificationResource($notification)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
