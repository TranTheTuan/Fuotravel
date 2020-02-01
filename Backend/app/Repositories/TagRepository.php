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

    public function addTags(array $data)
    {
        $taggable_type = $this->getTaggableType($data);
        if ($taggable_type) {
            foreach ($data['tags'] as $tag) {
                $taggable_type->tags()->attach($tag);
            }
            return true;
        }
        return false;
    }

    public function showTags(array $data)
    {
        $taggable_type = $this->getTaggableType($data);
        return $taggable_type->tags;
    }

    public function detachTags(array $data)
    {
        $taggable_type = $this->getTaggableType($data);
        if ($taggable_type) {
            foreach ($data['tags'] as $tag) {
                $taggable_type->tags()->detach($tag);
            }
            return true;
        }
        return false;
    }

    private function getTaggableType(array $data)
    {
        $taggable_type = Null;
        if ($data['taggable'] == Tag::USER) {
            $taggable_type = Auth::user();
        } elseif ($data['taggable'] == Tag::PLAN) {
            $taggable_type = Plan::find($data['taggable_id']);
        } elseif ($data['taggable'] == Tag::GROUP) {
            $taggable_type = Group::find($data['taggable_id']);
        } else {
            $taggable_type = Post::find($data['taggable_id']);
        }
        return $taggable_type;
    }
}
