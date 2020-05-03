<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Waypoint extends Model
{
    protected $guarded = [];

    public function plan()
    {
        return $this->belongsTo('App\Plan');
    }
}
