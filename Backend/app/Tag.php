<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    const USER = 1;
    const PLAN = 2;
    const GROUP = 3;
    const POST = 4;

    protected $guarded = [];

    public function posts()
    {
        return $this->morphedByMany('App\Post', 'taggable');
    }

    public function groups()
    {
        return $this->morphedByMany('App\Post', 'taggable');
    }

    public function plans()
    {
        return $this->morphedByMany('App\Plan', 'taggable');
    }

    public function users()
    {
        return $this->morphedByMany('App\User', 'taggable');
    }
}
