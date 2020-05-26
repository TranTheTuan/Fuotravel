<?php

namespace App\Listeners;

use App\Events\CommentEvent;
use App\Http\Resources\NotificationResource;
use App\Member;
use App\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class CommentListener
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
    public function handle(CommentEvent $event)
    {
        try {
            Redis::connection();
            $comment = $event->comment;
            $plan = $event->plan;
            $post = $event->post;
            $sender = $comment->user;
            $message = '';
            $receiver_ids = [];
            $roomType = Notification::PLAN_ROOM;
            $roomId = 1;
            if (!$event->isReply) {
                if (!is_null($plan)) {
                    $message = $sender->firstname . ' ' . $sender->lastname . ' commented on plan '.$plan->title .' you are following';
                    $member_ids = $plan->members()->where('status', Member::FOLLOWING)->pluck('user_id');
                    $receiver_ids = collect($plan->user_id)->concat($member_ids);
                    $roomId = $plan->id;
                }
                if (!is_null($post)) {
                    $message = $sender->firstname . ' ' . $sender->lastname . ' commented on '.$post->user->firstname .'\'s post';
                    $commenter_ids = $post->comments()->pluck('user_id');
                    $receiver_ids = collect($post->user_id)->concat($commenter_ids);
                    $roomType = Notification::POST_ROOM;
                    $roomId = $post->id;
                }
            } else {
                $message = $sender->firstname . ' ' . $sender->lastname . ' replied your comment';
                $replier_ids = $comment->comments->pluck('user_id');
                $receiver_ids = collect($comment->user_id)->concat($replier_ids);
                $roomType = Notification::COMMENT_ROOM;
                $roomId = $comment->id;
            }
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => $roomType,
                'room_id' => $roomId
            ]);
            $notification->receivers()->attach($receiver_ids);
            Redis::publish('send-message', json_encode(new NotificationResource($notification)));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
