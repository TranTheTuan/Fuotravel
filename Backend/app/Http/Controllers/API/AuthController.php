<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ApiController;

class AuthController extends ApiController
{
    private $userRepo;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepo = $userRepository;
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
        return $this->sendResponse($token);
    }

    public function register(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, $this->userRepo->registerRules());

        if($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }
        $data['password'] = bcrypt($request->password);
        $user = User::create($data);
        $token = $user->createToken('Personal access token');
        return $this->sendResponse($token);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->token()->revoke();
        return $this->sendResponse('api/api.logged_out');
    }
}
