<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 1
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 1
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 1
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 1
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 1
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 2
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 2
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 2
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 2
            ],
            [
                'caption' => 'ok',
                'plan_id' => 1,
                'user_id' => 2
            ],
            [
                'caption' => 'ok',
                'plan_id' => 2,
                'user_id' => 5
            ],
            [
                'caption' => 'ok',
                'plan_id' => 2,
                'user_id' => 4
            ],
            [
                'caption' => 'ok',
                'plan_id' => 2,
                'user_id' => 3
            ],
            [
                'caption' => 'ok',
                'plan_id' => 2,
                'user_id' => 3
            ],
            [
                'caption' => 'ok',
                'plan_id' => 2,
                'user_id' => 3
            ],
        ]);
    }
}
