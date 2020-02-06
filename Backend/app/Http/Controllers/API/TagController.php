<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Member;
use App\Repositories\TagRepository;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagController extends ApiController
{
    protected $tagRepo;

    public function __construct(TagRepository $tagRepo)
    {
        $this->tagRepo = $tagRepo;
    }

    public function add(Request $request, $taggable_id, $taggable)
    {
        $this->authorize('update', [Tag::class, $taggable_id, $taggable]);
        $data['tags'] = $request->all();
        $added = $this->tagRepo->addTags($data, $taggable_id, $taggable);
        if ($added) {
            return $this->sendResponse(__('api/api.added_tags'));
        }
        return $this->sendError(__('api/api.add_tags_error'));
    }

    public function index()
    {
        return $this->sendResponse($this->tagRepo->all());
    }

    public function show($taggable_id, $taggable)
    {
        return $this->sendResponse($this->tagRepo->showTags($taggable_id, $taggable));
    }

    public function detach(Request $request, $taggable_id, $taggable)
    {
        $this->authorize('update', [Tag::class, $taggable_id, $taggable]);
        $data = $request->all();
        $added = $this->tagRepo->detachTags($data, $taggable_id, $taggable);
        if ($added) {
            return $this->sendResponse(__('api/api.detached_tags'));
        }
        return $this->sendError(__('api/api.detach_tags_error'));
    }
}
