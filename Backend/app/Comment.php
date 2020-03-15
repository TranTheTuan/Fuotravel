<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    const PLAN = 1;
    const POST = 2;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    public function comments()
    {
        return $this->hasMany('App\Comment', 'parent_id');
    }

    public function votes()
    {
        return $this->morphMany('App\Vote', 'voteable');
    }
}
