<?php

namespace App\Policies;

use App\Member;
use App\Repositories\TagRepository;
use App\Tag;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TagPolicy
{
    use HandlesAuthorization;

    protected $tagRepo;
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(TagRepository $tagRepo)
    {
        $this->tagRepo = $tagRepo;
    }

    public function update(User $user, $taggable_id, $taggable)
    {
        $taggable_type = $this->tagRepo->getTaggableType($taggable_id, $taggable);
        if($taggable_type instanceof User) {
            return true;
        }
        $member = $taggable_type->members->where('user_id', $user->id)->pluck('status');
        return $taggable_type->user_id == $user->id || $member->contains(Member::ADMIN) || $member->contains(Member::MODERATOR);
    }
}
