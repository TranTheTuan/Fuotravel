<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sender' => new UserResource($this->sender),
            'message' => $this->message,
            'link' => $this->link,
            'roomId' => $this->room_id,
            'roomType' => $this->room_type,
            'readAt' => $this->whenPivotLoaded('receivers', function () {
                return $this->pivot->read_at;
            })
        ];
    }
}
