<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;

class TagController extends ApiController
{
    protected $tagRepo;

    public function __construct(TagRepository $tagRepo)
    {
        $this->tagRepo = $tagRepo;
    }

    public function add(Request $request, $taggable_id, $taggable)
    {
        $data['tags'] = $request->all();
        $data['taggable_id'] = $taggable_id;
        $data['taggable'] = $taggable;
        $added = $this->tagRepo->addTags($data);
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
        $data['taggable_id'] = $taggable_id;
        $data['taggable'] = $taggable;
        return $this->sendResponse($this->tagRepo->showTags($data));
    }

    public function detach(Request $request, $taggable_id, $taggable)
    {
        $data['tags'] = $request->all();
        $data['taggable_id'] = $taggable_id;
        $data['taggable'] = $taggable;
        $added = $this->tagRepo->detachTags($data);
        if ($added) {
            return $this->sendResponse(__('api/api.detached_tags'));
        }
        return $this->sendError(__('api/api.detach_tags_error'));
    }
}
