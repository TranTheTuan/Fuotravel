<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'firstname' => 'Tuan',
                'lastname' => 'Tran',
                'gender' => 1,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'name' => 'tuantt',
                'email' => 'tuantt@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Lan',
                'lastname' => 'Le',
                'gender' => 2,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'name' => 'lanll',
                'email' => 'lanll@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Phu',
                'lastname' => 'Pham',
                'gender' => 3,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'name' => 'phupp',
                'email' => 'phupp@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Hung',
                'lastname' => 'Ha',
                'gender' => 3,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'name' => 'hunghh',
                'email' => 'hunghh@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Cuong',
                'lastname' => 'Nguyen',
                'gender' => 1,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'name' => 'cuongnn',
                'email' => 'cuongnn@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ]
        ]);
    }
}
