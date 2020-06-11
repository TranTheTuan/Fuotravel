<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SentPlanInvitationEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $plan, $receiver_ids;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Plan $plan, $receiver_ids)
    {
        $this->plan = $plan;
        $this->receiver_ids = $receiver_ids;
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
