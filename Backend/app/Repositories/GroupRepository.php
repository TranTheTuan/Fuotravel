<?php

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;

class GroupRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Group';
    }

    public function create(array $data)
    {
        $user = Auth::user();
        return $user->groups()->create($data);
    }
}
