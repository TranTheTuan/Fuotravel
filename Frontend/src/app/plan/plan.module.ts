import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { MatButtonModule } from '@angular/material/button';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MemberComponent } from './member/member.component';
import {PostModule} from '../post/post.module';
import {RequestComponent} from './request/request.component';

@NgModule({
  declarations: [PlanComponent, RequestComponent, MemberComponent],
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
