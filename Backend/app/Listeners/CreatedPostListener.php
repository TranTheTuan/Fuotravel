<?php

namespace App\Listeners;

use App\Events\CreatedPostEvent;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\PostResource;
use App\Member;
use App\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class CreatedPostListener
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
    public function handle(CreatedPostEvent $event)
    {
        try {
            $post = $event->post;
            $plan = $post->plan;
            $sender = Auth::user();
            $message = $sender->firstname . ' ' .$sender->lastname . ' created a post in plan ' . $plan->title . ' you are following';
            $receiver_ids = $plan->members()->where('user_id', '!=', $sender->id)
                ->where('status', Member::FOLLOWING)->pluck('user_id');
            if ($plan->user_id != $sender->id) {
                $receiver_ids->push($plan->user_id);
            }
            $roomId = $plan->id;
            $roomType = Notification::PLAN_ROOM;
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_id' => $roomId,
                'room_type' => $roomType
            ]);
            $notification->receivers()->attach($receiver_ids);
            Redis::publish('send-message', json_encode(new NotificationResource($notification)));
            Redis::publish('add-post', json_encode(new PostResource($post)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
