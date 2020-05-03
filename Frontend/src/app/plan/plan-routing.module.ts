import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanComponent } from './plan.component';
import {RequestComponent} from './request/request.component';
import {MemberComponent} from './member/member.component';
import {PostComponent} from '../post/post.component';
import {CommentComponent} from '../comment/comment.component';
import {HereMapComponent} from './here-map/here-map.component';

const routes: Routes = [{ path: ':plan_id', component: PlanComponent, children: [
    { path: '', redirectTo: 'discuss', pathMatch: 'full'},
    { path: 'discuss', component: CommentComponent},
    { path: 'requests', component: RequestComponent },
    { path: 'members', component: MemberComponent },
    { path: 'posts', component: PostComponent },
    { path: 'here-map', component: HereMapComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
