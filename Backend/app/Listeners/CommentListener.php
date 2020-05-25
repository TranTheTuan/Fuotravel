<?php

namespace App\Listeners;

use App\Events\CommentEvent;
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
            $receivers_ids = [];
            if (!$event->isReply) {
                if (!is_null($plan)) {
                    $message = $sender->firstname . ' ' . $sender->lastname . ' commented on plan '.$plan->title .' you are following';
                    $receiver_ids = $plan->members()->where('status', Member::FOLLOWING)->pluck('user_id');
                }
                if (!is_null($post)) {
                    $message = $sender->firstname . ' ' . $sender->lastname . ' commented on '.$post->user->firstname .'\'s post';
                    $commenter_ids = $post->comments()->pluck('user_id');
                    $receiver_ids = $commenter_ids->push($post->user_id);
                }
            } else {
                $message = $sender->firstname . ' ' . $sender->lastname . ' replied your comment';
                $replier_ids = $comment->comments->pluck('user_id');
                $receiver_ids = $replier_ids->push($comment->user_id);
            }
            $notification = $sender->notifications()->create([
                'message' => $message
            ]);
            $notification->receivers()->attach($receiver_ids);
            Redis::publish('send-message', json_encode($notification));
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
    }
}
