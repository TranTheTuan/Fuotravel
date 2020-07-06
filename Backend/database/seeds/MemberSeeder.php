<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('members')->insert([
            [
                'plan_id' => 1,
                'user_id' => 1,
                'status' => 5
            ],
            [
                'plan_id' => 2,
                'user_id' => 1,
                'status' => 5
            ],
            [
                'plan_id' => 3,
                'user_id' => 2,
                'status' => 5
            ],
            [
                'plan_id' => 4,
                'user_id' => 2,
                'status' => 5
            ],
            [
                'plan_id' => 5,
                'user_id' => 3,
                'status' => 5
            ],
            [
                'plan_id' => 6,
                'user_id' => 3,
                'status' => 5
            ],
            [
                'plan_id' => 7,
                'user_id' => 4,
                'status' => 5
            ],
            [
                'plan_id' => 8,
                'user_id' => 4,
                'status' => 5
            ],
            [
                'plan_id' => 9,
                'user_id' => 5,
                'status' => 5
            ],
            [
                'plan_id' => 10,
                'user_id' => 5,
                'status' => 5
            ],
        ]);
    }
}
