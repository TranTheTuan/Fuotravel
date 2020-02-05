<?php

namespace App\Repositories;

use App\Comment;
use App\Image;
use App\Post;
use App\Repositories\BaseRepositories\AbstractRepository;

class ImageRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Image';
    }

    public function showImages($imageable_id, $imageable)
    {
        $imageable_type = $this->checkImagableType($imageable_id, $imageable);
        return $imageable_type->images;
    }

    private function checkImagableType($imageable_id, $imageable)
    {
        if ($imageable == Image::POST) {
            return Post::find($imageable_id);
        }
        return Comment::find($imageable_id);
    }
}
