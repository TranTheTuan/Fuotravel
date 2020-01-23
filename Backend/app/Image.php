<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    const POST = 1;
    const COMMENT = 2;
    
    protected $guarded = [];

    public function imageable()
    {
        return $this->morphTo();
    }
}
