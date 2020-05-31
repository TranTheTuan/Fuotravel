<?php

namespace App\Listeners;

use App\Events\CommentEvent;
use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NotificationResource;
use App\Member;
use App\Comment;
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
            // Redis::connection();
            $comment = $event->comment;
            $plan = $event->plan;
            $post = $event->post;
            $sender = Auth::user();
            $message = '';
            $receiver_ids = [];
            $roomType = Notification::PLAN_ROOM;
            $roomId = 1;
            $commentPostId = 1;
            $isReply = false;
            $parentId = $event->parentId;
            if (!is_null($plan)) {
                $message = $sender->firstname . ' ' . $sender->lastname . ' commented on plan '.$plan->title .' you are following';
                $receiver_ids = $plan->members()->where('user_id', '!=', $sender->id)
                    ->where('status', Member::FOLLOWING)->pluck('user_id');
                if ($plan->user_id != $sender->id) {
                    $receiver_ids->push($plan->user_id);
                }
                $roomId = $plan->id;
//                $commentPostId = $plan->id;
            }
            if (!is_null($post)) {
                $message = $sender->firstname . ' ' . $sender->lastname . ' commented on '.$post->user->firstname .'\'s post';
                $receiver_ids = $post->comments()->where('user_id', '!=', $sender->id)->pluck('user_id');
                if ($post->user_id != $sender->id) {
                    $receiver_ids->push($post->user_id);
                }
                $roomType = Notification::POST_ROOM;
                $roomId = $post->id;
                $commentPostId = $post->id;
            }
            if (!is_null($parentId)) {
                $message = $sender->firstname . ' ' . $sender->lastname . ' replied your comment';
                $receiver_ids = $comment->comments->where('user_id', '!=', $sender->id)->pluck('user_id');
                if ($comment->user_id != $sender->id) {
                    $receiver_ids->push($sender->id);
                }
                $roomType = Notification::COMMENT_ROOM;
                $roomId = $parentId;
                $isReply = true;
            }
            $notification = $sender->notifications()->create([
                'message' => $message,
                'room_type' => $roomType,
                'room_id' => $roomId
            ]);
            $notification->receivers()->attach($receiver_ids);
            $commentData = [
                'comment' => new CommentResource($comment),
                'commentPostId' => $commentPostId,
                'isReply' => $isReply
            ];
            Redis::publish('send-message', json_encode(new NotificationResource($notification)));
            Redis::publish('add-comment', json_encode($commentData));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
