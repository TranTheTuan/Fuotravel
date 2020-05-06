<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\BroadcastDemo;

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
        Route::post('update/{plan_id}', 'API\PlanController@update');
        Route::delete('delete/{plan_id}', 'API\PlanController@delete');
        Route::put('update/status/{plan_id}', 'API\PlanController@updateStatus');
        Route::put('cancel/{plan_id}', 'API\PlanController@cancel');
        Route::post('{plan_id}/waypoints', 'Api\WaypointController');
    });

    Route::prefix('here-map')->group(function() {
        Route::prefix('search')->group(function() {
            Route::get('discover', 'API\HereMapController@discover');
            Route::get('geocode/{query}', 'API\HereMapController@geocode');
            Route::get('revgeocode/{lat}/{lng}', 'API\HereMapController@revgeocode');
            Route::get('auto-suggest', 'API\HereMapController@autosuggest');
        });
    });

    // Route::prefix('groups')->group(function () {
    //     Route::get('{group_id}', 'API\GroupController@show');
    //     Route::post('create', 'API\GroupController@create');
    //     Route::put('update/{group_id}', 'API\GroupController@update');
    //     Route::get('{group_id}/plans', 'API\GroupController@getPlans');
    //     Route::get('{group_id}/posts', 'API\GroupController@getPosts');
    // });

    Route::prefix('members')->group(function () {
        Route::get('membership/{plan_id}', 'API\MemberController@getMembership');
        Route::get('requesters/{plan_id}', 'API\MemberController@getRequesters');
        Route::get('joined/{plan_id}', 'API\MemberController@getMembers');
        Route::post('join/{plan_id}', 'API\MemberController@join');
        Route::post('follow/{plan_id}', 'API\MemberController@follow');
        Route::post('unfollow/{plan_id}', 'API\MemberController@unfollow');
        Route::post('leave/{plan_id}', 'API\MemberController@leave');
        Route::prefix('admin')->group(function () {
            Route::post('kick/{user_id}/{plan_id}', 'API\MemberController@kick');
            Route::post('accept/{user_id}/{plan_id}', 'API\MemberController@accept');
            Route::post('decline/{user_id}/{plan_id}', 'API\MemberController@decline');
            Route::post('ban/{user_id}/{plan_id}', 'API\MemberController@ban');
            Route::post('promote/{user_id}/{plan_id}/{role}', 'API\MemberController@appoint');
            Route::post('discharge/{user_id}/{plan_id}/{role}', 'API\MemberController@discharge');
        });
    });

    Route::prefix('posts')->group(function() {
        Route::get('{plan_id}', 'API\PostController@index');
        Route::post('create/{plan_id}', 'API\PostController@create');
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
        Route::delete('{comment_id}', 'API\CommentController@delete');
    });

    Route::prefix('votes')->group(function () {
        Route::post('upvote/{voteable_id}/voteable/{voteable}', 'API\VoteController@upvote');
        Route::post('downvote/{voteable_id}/voteable/{voteable}', 'API\VoteController@downvote');
    });

    Route::prefix('images')->group(function () {
        Route::get('{post_id}', 'API\ImageController@show');
    });

    Route::prefix('users')->group(function () {
        Route::prefix('friendships')->group(function () {
            Route::prefix('requests')->group(function () {
                Route::get('sent', 'API\UserController@sentFriendRequests');
                Route::get('received', 'API\UserController@getFriendRequests');
                Route::post('send/{recipient_id}', 'API\UserController@sendFriendRequest');
                Route::put('accept/{sender_id}', 'API\UserController@acceptFriendRequest');
                Route::delete('cancel/{sender_id}', 'API\UserController@cancelFriendRequest');
            });
            Route::prefix('block')->group(function () {
                Route::post('/{target_id}', 'API\UserController@block');
                Route::get('blocked', 'API\UserController@blockedFriends');
            });
            Route::get('/', 'API\UserController@getFriends');
        });
    });
});
