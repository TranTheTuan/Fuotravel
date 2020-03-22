<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResouce;
use App\Http\Resources\ImageResource;

class PostResource extends JsonResource
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
            'caption' => $this->caption,
            'author' => new UserResource($this->user),
            'vote' => $this->vote,
            'images' => $this->when($this->images, ImageResource::collection($this->images)),
            'created_at' => $this->created_at
        ];
    }
}
