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

    public function showImages($data)
    {
        $imageable_type = $this->checkImagableType($data);
        return $imageable_type->images;
    }

    public function checkImagableType($data)
    {
        $imageable_type = NULL;
        if ($data['imageable'] == Image::POST) {
            $imageable_type = Post::find($data['imageable_id']);
        } else {
            $imageable_type = Comment::find($data['imageable_id']);
        }
        return $imageable_type;
    }
}
