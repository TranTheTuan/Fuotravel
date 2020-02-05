<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    const PENDING = 1;
    const FRIENDS = 2;
    const BLOCKED = 3;

    protected $guarded = [];
}
