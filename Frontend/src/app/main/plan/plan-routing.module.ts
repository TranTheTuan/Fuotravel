import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';

import {PlanComponent} from './plan.component';
import {RequestComponent} from './request/request.component';
import {MemberComponent} from './member/member.component';
import {PostComponent} from '../post/post.component';
import {CommentComponent} from '../comment/comment.component';
import {HereMapComponent} from './here-map/here-map.component';
import {AuthGuard} from '../../utility/helpers/auth.guard';
import {MembershipResolver} from '../../utility/helpers/membership.resolver';

const routes: Routes = [{
  path: ':plan_id', component: PlanComponent, canActivate: [AuthGuard], resolve: {
    data: MembershipResolver
  }, children: [
    {path: '', redirectTo: 'here-map', pathMatch: 'full'},
    {path: 'discuss', component: CommentComponent},
    {path: 'requests', component: RequestComponent},
    {path: 'members', component: MemberComponent},
    {path: 'posts', component: PostComponent},
    {path: 'here-map', component: HereMapComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {
}
