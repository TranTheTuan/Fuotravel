<?php 

namespace App\Repositories;

use App\Repositories\BaseRepositories\AbstractRepository;

class UserRepository extends AbstractRepository
{
    public function model()
    {
        return 'App\User';
    }

    public function loginRules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    public function registerRules()
    {
        return [
            'firstname' => 'required|string|max:20',
            'lastname' => 'required|string|max:20',
            'gender' => 'nullable',
            'birthday'  => 'nullable|date',
            'avatar' => 'nullable|string',
            'username' => 'required|alpha_dash|min:4|max:12',
            'phone' => 'nullable|string',
            'password' => 'required|min:3'
        ];
    }

    public function checkActiveStatus($email, $active)
    {
        $user = $this->findBy('email', $email);
        return $user ? $user->active == $active : false;
    }
}
