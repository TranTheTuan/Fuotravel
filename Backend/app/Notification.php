<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $guarded = [];

    public function sender()
    {
        return $this->belongsTo('App\User');
    }

    public function receivers()
    {
        return $this->belongsToMany('App\User', 'receivers')
            ->withPivot('read_at');
    }
}
