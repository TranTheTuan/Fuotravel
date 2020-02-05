<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function plans()
    {
        return $this->hasMany('App\Plan');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function posts()
    {
        return $this->morphMany('App\Post', 'postable');
    }

    public function members()
    {
        return $this->morphMany('App\Member', 'memberable');
    }
}
