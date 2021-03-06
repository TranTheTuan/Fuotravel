<?php

namespace App\Repositories;

use App\Plan;
use App\Group;
use App\Post;
use App\Tag;
use App\Repositories\BaseRepositories\AbstractRepository;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Null_;

class TagRepository extends AbstractRepository
{
	public function model()
    {
        return 'App\Tag';
    }

    public function addTags(array $data, $taggable_id, $taggable)
    {
        $taggable_type = $this->getTaggableType($taggable_id, $taggable);
        if ($taggable_type) {
            foreach ($data['tags'] as $tag) {
                $taggable_type->tags()->attach($tag);
            }
            return $taggable_type;
        }
        return false;
    }

    public function showTags($taggable_id, $taggable)
    {
        $taggable_type = $this->getTaggableType($taggable_id, $taggable);
        return $taggable_type->tags;
    }

    public function detachTags(array $data, $taggable_id, $taggable)
    {
        $taggable_type = $this->getTaggableType($taggable_id, $taggable);
        if ($taggable_type) {
            foreach ($data['tags'] as $tag) {
                $taggable_type->tags()->detach($tag);
            }
            return true;
        }
        return false;
    }

    public function updateTags(array $data, $taggable_id, $taggable)
    {
        $taggable_type = $this->getTaggableType($taggable_id, $taggable);
        if ($taggable_type) {
            $taggable_type->tags()->detach();
            foreach ($data['tags'] as $tag) {
                $taggable_type->tags()->attach($tag);
            }
            return $taggable_type->tags;
        }
        return false;
    }

    public function getTaggableType($taggable_id, $taggable)
    {
        if ($taggable == Tag::USER) {
            return Auth::user();
        } elseif ($taggable == Tag::PLAN) {
            return Plan::find($taggable_id);
        }
        return Post::find($taggable_id);
    }
}
