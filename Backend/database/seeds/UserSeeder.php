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
                'username' => 'tuantt',
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
                'username' => 'lanll',
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
                'username' => 'phupp',
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
                'username' => 'hunghh',
                'email' => 'hunghh@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Cuong',
                'lastname' => 'Cung',
                'gender' => 1,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'username' => 'cuongcc',
                'email' => 'cuongcc@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
            [
                'firstname' => 'Thao',
                'lastname' => 'Tao',
                'gender' => 1,
                'birthday' => '1998/01/20',
                'avatar' => 'default/avatar/avatar.png',
                'username' => 'thaott',
                'email' => 'thaott@gmail.com',
                'password' => bcrypt('secret'),
                'active' => 1
            ],
        ]);
    }
}
