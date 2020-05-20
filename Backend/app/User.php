<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends \TCG\Voyager\Models\User
{
    use Notifiable, HasApiTokens;

    const MALE = 1;
    const FEMALE = 2;
    const OTHERS = 3;

    const ACTIVE = 1;
    const DISABLED = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function plans()
    {
        return $this->hasMany('App\Plan');
    }

    public function groups()
    {
        return $this->hasMany('App\Group');
    }

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function members()
    {
        return $this->hasMany('App\Member');
    }

    public function votes()
    {
        return $this->hasMany('App\Vote');
    }

    // friendship that this user started second_user_id
    protected function friendsOfThisUser()
    {
        return $this->belongsToMany('App\User', 'relationships', 'first_user_id', 'second_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::FRIENDS);
    }

    // friendship that this user was asked for
    protected function thisUserFriendOf()
    {
        return $this->belongsToMany('App\User', 'relationships', 'second_user_id', 'first_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::FRIENDS);
    }

    public function getFriendsAttribute()
    {
        if (!array_key_exists('friends', $this->relations)) $this->loadFriends();
        return $this->getRelation('friends');
    }

    protected function loadFriends()
    {
        if (!array_key_exists('friends', $this->relations)) {
            $friends = $this->mergeFriends();
            $this->setRelation('friends', $friends);
        }
    }

    protected function mergeFriends()
    {
        if ($temp = $this->friendsOfThisUser) {
            return $temp->merge($this->thisUserFriendOf);
        }
        return $this->thisUserFriendOf;
    }

    // friendship that this user started but now blocked
    protected function friendsOfThisUserBlocked()
    {
        return $this->belongsToMany('App\User', 'relationships', 'first_user_id', 'second_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::BLOCKED);
//            ->wherePivot('action_user_id', 'first_user_id');
    }

    // friendship that this user was asked for but now blocked
    protected function thisUserFriendOfBlocked()
    {
        return $this->belongsToMany('App\User', 'relationships', 'second_user_id', 'first_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::BLOCKED);
//            ->wherePivot('action_user_id', 'second_user_id');
    }

    // accessor allowing you call $user->blocked_friends
    public function getBlockedFriendsAttribute()
    {
        if ( ! array_key_exists('blocked_friends', $this->relations)) $this->loadBlockedFriends();
        return $this->getRelation('blocked_friends');
    }

    protected function loadBlockedFriends()
    {
        if ( ! array_key_exists('blocked_friends', $this->relations))
        {
            $friends = $this->mergeBlockedFriends();
            $this->setRelation('blocked_friends', $friends);
        }
    }

    protected function mergeBlockedFriends()
    {
        if($temp = $this->friendsOfThisUserBlocked)
            return $temp->merge($this->thisUserFriendOfBlocked);
        else
            return $this->thisUserFriendOfBlocked;
    }

    public function sentFriendRequests()
    {
        return $this->belongsToMany('App\User', 'relationships', 'first_user_id', 'second_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::PENDING);
    }

    public function receivedFriendRequests()
    {
        return $this->belongsToMany('App\User', 'relationships', 'second_user_id', 'first_user_id')
            ->withPivot('status', 'action_user_id')
            ->wherePivot('status', Relationship::PENDING);
    }



    // deprecated
//    public function sentFriendRequests()
//    {
//        return $this->hasMany('App\Relationship', 'first_user_id')
//            ->where('status', Relationship::PENDING);
//    }
//
//    public function receivedFriendRequests()
//    {
//        return $this->hasMany('App\Relationship', 'second_user_id')
//            ->where('status', Relationship::PENDING);
//    }
}
