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
Route::get('login/provider/{provider}', 'API\AuthController@redirectToProviderOAuth');
Route::get('login/facebook/callback', 'API\AuthController@handleFacebookCallback');
Route::get('login/google/callback', 'API\AuthController@handleGoogleCallback');

Route::prefix('plans')->group(function() {
    Route::get('/', 'API\PlanController@index');
    Route::get('{plan_id}', 'API\PlanController@show');
    Route::get('{plan_id}/waypoints', 'API\PlanController@getWaypoints');
});

Route::prefix('comments')->group(function () {
    Route::get('{commentable_id}/commentable/{commentable}', 'API\CommentController@show');
});

Route::prefix('posts')->group(function() {
    Route::get('{plan_id}', 'API\PostController@index');
});

Route::prefix('members')->group(function () {
    Route::get('requesters/{plan_id}', 'API\MemberController@getRequesters');
    Route::get('joined/{plan_id}', 'API\MemberController@getMembers');
});

Route::prefix('tags')->group(function () {
    Route::get('/', 'API\TagController@index');
    Route::get('{taggable_id}/taggable/{taggable}', 'API\TagController@show');
});

Route::middleware('auth:api')->group(function() {
    Route::post('logout', 'API/AuthController@logout');

    Route::prefix('plans')->group(function() {
        Route::get('members-status', 'API\PlanController@getPlansByMemberStatus');
        Route::post('create', 'API\PlanController@create');
        Route::post('update/{plan_id}', 'API\PlanController@update');
        Route::delete('delete/{plan_id}', 'API\PlanController@delete');
        Route::put('update/status/{plan_id}', 'API\PlanController@toggleStatus');
        Route::put('cancel/{plan_id}', 'API\PlanController@cancel');
        Route::post('{plan_id}/waypoints', 'API\WaypointController');
        Route::get('{plan_id}/invitable-friends', 'API\PlanController@getInvitableFriends');
        Route::post('{plan_id}/invite-friends', 'API\PlanController@sendInvitation');
    });

    Route::prefix('here-map')->group(function() {
        Route::prefix('search')->group(function() {
            Route::get('discover', 'API\HereMapController@discover');
            Route::get('geocode', 'API\HereMapController@geocode');
            Route::get('revgeocode', 'API\HereMapController@revgeocode');
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
        Route::post('create/{plan_id}', 'API\PostController@create');
        Route::delete('{post_id}', 'API\PostController@delete');
    });

    Route::prefix('tags')->group(function () {
        Route::post('update/{taggable_id}/taggable/{taggable}', 'API\TagController@update');
    });

    Route::prefix('comments')->group(function () {
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
        Route::put('{user_id}/avatar', 'API\UserController@updateAvatar');
        Route::put('{user_id}', 'API\UserController@updateProfile');
        Route::get('{user_id}', 'API\UserController@getProfile');
        Route::prefix('friendships')->group(function () {
            Route::get('{user_id}', 'API\UserController@getFriends');
            Route::delete('unfriend/{target_id}', 'API\UserController@unfriend');
            Route::get('between/{target_id}', 'API\UserController@getRelationshipBetween');
            Route::prefix('requests')->group(function () {
                Route::get('sent', 'API\UserController@sentFriendRequests');
                Route::get('received', 'API\UserController@getFriendRequests');
                Route::post('send/{recipient_id}', 'API\UserController@sendFriendRequest');
                Route::put('accept/{sender_id}', 'API\UserController@acceptFriendRequest');
                Route::delete('decline/{sender_id}', 'API\UserController@declineFriendRequest');
                Route::delete('cancel/{resipient_id}', 'API\UserController@cancelFriendRequest');
            });
            // block - deprecated
            Route::prefix('block')->group(function () {
                Route::post('{target_id}', 'API\UserController@block');
                Route::get('blocked', 'API\UserController@blockedFriends');
            });
        });
        Route::prefix('notifications')->group(function () {
            Route::get('/', 'API\NotificationController@index');
            Route::put('{notification_id}/mark-as-read', 'API\NotificationController@markAsRead');
            Route::put('{notification_id}/mark-as-unread', 'API\NotificationController@markAsUnread');
            Route::put('{notification_id}/mark-all-as-read', 'API\NotificationController@markAllAsRead');
        });
    });
});
