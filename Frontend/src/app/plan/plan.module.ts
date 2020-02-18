import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { OverviewComponent } from './overview/overview.component';
import { MatButtonModule } from '@angular/material/button';
import { RequestComponent } from './request/request.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MemberComponent } from './member/member.component';
import {PostModule} from '../post/post.module';


@NgModule({
  declarations: [PlanComponent, OverviewComponent, RequestComponent, MemberComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    ToolbarModule,
    PipesModule,
    MatButtonModule,
    MatTabsModule,
    PostModule
  ],
})
export class PlanModule { }
