<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    // public function postable()
    // {
    //     return $this->morphTo();
    // }

    public function plan()
    {
        return $this->belongsTo('App\Plan');
    }

    public function comments()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

    public function images()
    {
        return $this->hasMany('App\Image');
    }

    public function votes()
    {
        return $this->morphMany('App\Vote', 'voteable');
    }
}
