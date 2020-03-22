<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    const PENDING = 1;
    const FOLLOWING = 2;
    const MEMBER = 3;
    const BANNED = 4;
    const ADMIN = 5;
    const MODERATOR = 6;

    const PLAN = 1;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

//    public function memberable()
//    {
//        return $this->morphTo();
//    }
    public function plan()
    {
        return $this->belongsTo('App\Plan');
    }
}
