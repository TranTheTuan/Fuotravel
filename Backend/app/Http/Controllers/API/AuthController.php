<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ApiController;
use App\Services\ImageService;

class AuthController extends ApiController
{
    const UPLOAD_PATH = 'uploads/avatar/';
    private $userRepo, $imageService;

    public function __construct(UserRepository $userRepository, ImageService $imageService)
    {
        $this->userRepo = $userRepository;
        $this->imageService = $imageService;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), $this->userRepo->loginRules());

        if($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $canLogin = $this->userRepo->checkActiveStatus($request->email, User::ACTIVE);

        if(!$canLogin) {
            return $this->sendError(__('api/api.email_or_account_error'));
        }

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if(!Auth::attempt($credentials)) {
            return $this->sendError(__('api/api.password_error'));
        }
        $user = $request->user();
        $token = $user->createToken('Personal access token');
        $user->accessToken = $token->accessToken;
        $user->tags;
        return $this->sendResponse($user);
    }

    public function register(Request $request)
    {
        $data = $request->except(['password_confirmation', 'avatar']);
        $validator = Validator::make($data, $this->userRepo->registerRules());

        if($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }
        $data['password'] = bcrypt($request->password);
        if(!Hash::check($request->password_confirmation, $data['password'])) {
            return $this->sendError('password is not matched');
        }
        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            $data['avatar'] = $this->imageService->uploadImage(self::UPLOAD_PATH, $request->file('avatar'));
        }
        $user = User::create($data);
        $token = $user->createToken('Personal access token');
        $user->accessToken = $token->accessToken;
        $user->tags;
        return $this->sendResponse($user);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->token()->revoke();
        return $this->sendResponse('api/api.logged_out');
    }
}
