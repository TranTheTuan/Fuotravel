<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    const PLAN_ROOM = 'plan';
    const POST_ROOM = 'post';
    const COMMENT_ROOM = 'comment';
    const USER_ROOM = 'user';

    protected $guarded = [];

    public function sender()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function receivers()
    {
        return $this->belongsToMany('App\User', 'receivers')
            ->withPivot('read_at');
    }
}
