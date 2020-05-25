<?php

namespace App\Events;

use App\Comment;
use App\Plan;
use App\Post;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $comment, $plan = null, $post = null, $isReply;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Comment $comment, $commentableType, $isReply = false)
    {
        $this->comment = $comment;
        if (!$isReply) {
            if ($commentableType instanceof Plan) {
                $this->plan = $commentableType;
            } else {
                $this->post = $commentableType;
            }
        }
        $this->isReply = $isReply;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
