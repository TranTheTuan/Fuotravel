<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plans')->insert([
            [
                'title' => 'Du hành quanh Việt Nam',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Saigon',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 1
            ],
            [
                'title' => 'Du lịch Tây Bắc',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Laocai',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 1
            ],
            [
                'title' => 'Kham pha Mucangchai',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Phnompenh',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 2
            ],
            [
                'title' => 'nước Laos xinh đẹp',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Vientian',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 2
            ],
            [
                'title' => 'miền Tây hoang dã',
                'description' => 'very funny trip',
                'departure' => 'Saigon',
                'start_at' => '2020/03/01',
                'destination' => 'Camau',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 3
            ],
            [
                'title' => 'Một chuyến đi về Tây Nguyên',
                'description' => 'very funny trip',
                'departure' => 'Saigon',
                'start_at' => '2020/03/01',
                'destination' => 'Play ku',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 3
            ],
            [
                'title' => 'Du lịch Đà Nẵng',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Phnompenh',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 4
            ],
            [
                'title' => 'giao lưu văn hóa Tây Nguyên',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Phnompenh',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 4
            ],
            [
                'title' => 'nghỉ mát Sầm Sơn',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Phnompenh',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 5
            ],
            [
                'title' => 'Một chuyến đi lên Hà Giang',
                'description' => 'very funny trip',
                'departure' => 'Hanoi',
                'start_at' => '2020/03/01',
                'destination' => 'Phnompenh',
                'arrival_at' => '2020/03/09',
                'members_quantity' => 10,
                'user_id' => 5
            ],
        ]);
    }
}
