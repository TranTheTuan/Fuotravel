<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    const COMMENT = 1;
    const POST = 2;

    const UP = 1;
    const DOWN = 2;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function voteable()
    {
        return $this->morphTo();
    }
}
