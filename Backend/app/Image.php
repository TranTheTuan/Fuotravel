<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    const COMMENT = 1;
    const POST = 2;
    
    protected $guarded = [];

    public function imageable()
    {
        return $this->morphTo();
    }
}
