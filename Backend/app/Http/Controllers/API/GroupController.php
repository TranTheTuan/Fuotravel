<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Repositories\GroupRepository;
use App\Repositories\MemberRepository;
use App\Services\ImageService;
use Illuminate\Http\Request;

class GroupController extends ApiController
{
    const UPLOAD_PATH = 'uploads/group/';

    protected $groupRepo, $memberRepo, $imageService;

    public function __construct(GroupRepository $groupRepo, MemberRepository $memberRepo, ImageService $imageService)
    {
        $this->groupRepo = $groupRepo;
        $this->memberRepo = $memberRepo;
        $this->imageService = $imageService;
    }

    public function show($group_id)
    {
        return $this->groupRepo->find($group_id);
    }

    public function create(Request $request)
    {
        $data = $request->only(['name', 'about']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        return $this->sendResponse($this->groupRepo->create($data));
    }

    public function update(Request $request, $group_id)
    {
        $data = $request->only(['name', 'about']);

        if($request->file('cover') && $request->file('cover')->isValid()) {
            $data['cover'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('cover'));
        }

        return $this->sendResponse($this->groupRepo->update($data, $group_id));
    }
}
