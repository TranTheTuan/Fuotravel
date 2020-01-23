<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    const PENDING = 1;
    const FRIEND = 2;
    const FOLLOWING = 3;
    const BLOCKED = 4;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
