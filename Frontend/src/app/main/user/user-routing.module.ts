import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {UserPlansComponent} from './user-plans/user-plans.component';
import {UserFriendsComponent} from './user-friends/user-friends.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [{
  path: ':user_id', component: UserComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: UserProfileComponent},
    {path: 'plans', component: UserPlansComponent},
    {path: 'friends', component: UserFriendsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
