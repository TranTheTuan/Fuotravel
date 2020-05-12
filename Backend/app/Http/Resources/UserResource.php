<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TagResouce;

class UserResource extends JsonResource
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
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'avatar' => $this->avatar,
            'username' => $this->username,
            'phone' => $this->phone,
            'email' => $this->email,
            'tags' => $this->when($this->tags, TagResource::collection($this->tags))
        ];
    }
}
