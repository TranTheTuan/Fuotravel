<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\SentPlanInvitationEvent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use App\Notification;
use App\Http\Resources\NotificationResource;

class SentPlanInvitationListener
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
    public function handle(SentPlanInvitationEvent $event)
    {
        try {
            $plan = $event->plan;
            $receiver_ids = $event->receiver_ids;
            $sender = Auth::user();
            $message = $sender->firstname . ' ' . $sender->lastname . ' invites you to join plan ' . $plan->title;
            $link = '/plans/' . $plan->id;
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => 'user',
                'room_id' => $sender->id,
                'link' => $link
            ]);
            $notification->receivers()->attach($receiver_ids);
            Redis::publish('send-message', \json_encode(new NotificationResource($notification)));
        } catch(\Exception $e) {
            Log::error($e->getMessage());
        }
    }
}
