<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'content' => $this->content,
            'vote' => $this->vote,
            'replies' => $this->when(is_null($this->parent_id), CommentResource::collection($this->comments)),
            'parent_id' => $this->when($this->parent_id, $this->parent_id),
            'image' => $this->image
        ];
    }
}
