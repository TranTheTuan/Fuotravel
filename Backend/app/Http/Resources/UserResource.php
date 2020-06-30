<?php

namespace App\Http\Resources;

use App\Member;
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
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'tags' => $this->when($this->tags, TagResource::collection($this->tags)),
            'accessToken' => $this->when($this->accessToken, $this->accessToken),
            'roomData' => [
                'auth' => $this->id,
                'plan' => $this->when($this->plans || $this->members->whereIn('status', [Member::FOLLOWING, Member::ADMIN, Member::MODERATOR]),
                                $this->plans->pluck('id')->concat($this->members
                                    ->whereIn('status', [Member::FOLLOWING, Member::ADMIN, Member::MODERATOR])
                                    ->pluck('plan_id'))->unique()->values()),
                'post' => $this->when($this->posts, $this->posts->pluck('id')),
                'comment' => $this->when($this->comments, $this->comments->pluck('id')),
                'friend' => $this->when($this->friends, $this->friends->pluck('id')),
                'pendingFriend' => $this->when($this->sentFriendRequests, $this->sentFriendRequests->pluck('id'))
            ],
        ];
    }
}
