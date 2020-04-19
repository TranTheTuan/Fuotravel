<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tags')->insert([
            [
                'name' => 'núi'
            ],
            [
                'name' => 'sông'
            ],
            [
                'name' => 'hồ'
            ],
            [
                'name' => 'biển'
            ],
            [
                'name' => 'Tây Bắc'
            ],
            [
                'name' => 'Đông Bắc'
            ],
            [
                'name' => 'biên giới'
            ],
            [
                'name' => 'hải đảo'
            ],
            [
                'name' => 'Đà Lạt'
            ],
            [
                'name' => 'Tây Nguyên'
            ],
            [
                'name' => 'miền Tây'
            ],
            [
                'name' => 'đồng bằng Bắc Bộ'
            ],
            [
                'name' => 'Lào'
            ],
            [
                'name' => 'Cambodia'
            ],
            [
                'name' => 'Singapore'
            ],
            [
                'name' => 'China'
            ],
            [
                'name' => 'tuyết'
            ]
        ]);
    }
}
