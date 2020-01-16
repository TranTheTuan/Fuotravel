<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
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
