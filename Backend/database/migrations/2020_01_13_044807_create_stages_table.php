<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('start_point');
            $table->double('start_lng');
            $table->double('start_lat');
            $table->dateTime('start_time');
            $table->string('arrival_point');
            $table->double('arrival_lng');
            $table->double('arrival_lat');
            $table->dateTime('arrival_time');
            $table->string('vehicle')->nullable();
            $table->string('activity')->nullable();
            $table->integer('order');
            $table->unsignedBigInteger('plan_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('routes');
    }
}
