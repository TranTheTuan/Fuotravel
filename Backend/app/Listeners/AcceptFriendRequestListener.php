<?php

namespace App\Listeners;

use App\Events\AcceptFriendRequestEvent;
use App\Http\Resources\NotificationResource;
use App\Notification;
use App\Relationship;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class AcceptFriendRequestListener
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

    /* *
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(AcceptFriendRequestEvent $event)
    {
        try {
            $redis = Redis::connection();
            $relationship = $event->relationship;
            $sender = Auth::user();
            $roomType = Notification::USER_ROOM;
            $message = $sender->firstname . ' ' . $sender->lastname . ' accepted your friend request';
            $link = '/users/' . $sender->id . '/profile';
            $roomId = $relationship->first_user_id;
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => $roomType,
                'room_id' => $roomId,
                'link' => $link
            ]);
            $notification->receivers()->attach($roomId);
            $redis->publish('send-message', json_encode(new NotificationResource($notification)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
