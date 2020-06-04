<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use Socialite;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ApiController;
use App\Services\ImageService;
use Illuminate\Support\Str;

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
        return $this->sendResponse(new UserResource($user));
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

    public function redirectToProviderOAuth($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleFacebookCallback()
    {
        $user = Socialite::driver('facebook')->stateless()->user();
        dd($user->nickname);
    }

    public function handleGoogleCallback()
    {
        $data = Socialite::driver('google')->stateless()->user();
        $user = $data->user;
        $loggedinUser = User::firstOrCreate([
            'email' => $user['email']
        ], [
            'firstname' => $user['given_name'],
            'lastname' => $user['family_name'],
            'name' => $user['name'],
            'avatar' => $user['picture'],
            'password' => Hash::make(Str::random(24))
        ]);
        Auth::login($loggedinUser, true);
        dd($data, $loggedinUser);
    }
}
