<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;

class ImageRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Image';
    }

    public function create($data)
    {
        $this->model;
    }
}