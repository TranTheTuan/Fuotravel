<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    const PLAN = 1;
    const GROUP = 2;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function postable()
    {
        return $this->morphTo();
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }

    public function votes()
    {
        return $this->morphMany('App\Vote', 'voteable');
    }
}
