<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVoteColumnToPostsAndCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->integer('vote')->default(0)->after('caption');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->integer('vote')->default(0)->after('content');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('vote');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('vote');
        });
    }
}
