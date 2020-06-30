<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    const PLANNING = 0;
    const ACTIVE = 1;
    const END = 2;
    const CANCELED = 3;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function posts()
    {
        return $this->hasMany('App\Post')->orderBy('created_at', 'desc');
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function members()
    {
        return $this->hasMany('App\Member');
    }

    public function waypoints()
    {
        return $this->hasMany('App\Waypoint');
    }
}
