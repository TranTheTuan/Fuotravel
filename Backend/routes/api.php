<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');

Route::middleware('auth:api')->group(function() {
    Route::post('logout', 'API/AuthController@logout');

    Route::prefix('plans')->group(function() {
        Route::get('/', 'API\PlanController@index');
        Route::get('{plan_id}', 'API\PlanController@show');
        Route::post('create', 'API\PlanController@create');
        Route::put('update/{plan_id}', 'API\PlanController@update');
        Route::delete('delete/{plan_id}', 'API\PlanController@delete');
        Route::put('update/status/{plan_id}', 'API\PlanController@updateStatus');
        Route::put('cancel/{plan_id}', 'API\PlanController@cancel');
    });

    Route::prefix('groups')->group(function () {
        Route::get('{group_id}', 'API\GroupController@show');
        Route::post('create', 'API\GroupController@create');
        Route::put('update/{group_id}', 'API\GroupController@update');
    });

    Route::prefix('members')->group(function () {
        Route::post('join/{memberable_id}', 'API\MemberController@join');
        Route::post('accept/{memberable_id}/{user_id}', 'API\MemberController@accept');
        Route::post('ban/{memberable_id}/{user_id}', 'API\MemberController@ban');
        Route::post('follow/{memberable_id}', 'API\MemberController@follow');
        Route::post('unfollow/{memberable_id}', 'API\MemberController@unfollow');
        Route::post('kick/{memberable_id}/{user_id}', 'API\MemberController@kick');
    });

    Route::prefix('posts')->group(function() {
        Route::post('create/{postable_id}/postable/{postable}', 'API\PostController@create');
        Route::delete('{post_id}', 'API\PostController@delete');
    });

    Route::prefix('tags')->group(function () {
        Route::get('/', 'API\TagController@index');
        Route::post('add/{taggable_id}/taggable/{taggble}', 'API\TagController@add');
        Route::get('{taggable_id}/taggable/{taggable}', 'API\TagController@show');
        Route::post('detach/{taggable_id}/taggable/{taggble}', 'API\TagController@detach');
    });

    Route::prefix('comments')->group(function () {
        Route::get('{commentable_id}/commentable/{commentable}', 'API\CommentController@show');
        Route::post('create/{commentable_id}/commentable/{commentable}', 'API\CommentController@create');
        Route::delete('{post_id}', 'API\CommentController@delete');
    });
});

Route::get('/draft', function() {
    // App::setLocale('en');
    return App::getLocale();
});
