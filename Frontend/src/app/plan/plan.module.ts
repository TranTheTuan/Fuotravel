import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { MatButtonModule } from '@angular/material/button';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';
import { MemberComponent } from './member/member.component';
import {PostModule} from '../post/post.module';
import {RequestComponent} from './request/request.component';
import {CommentModule} from '../comment/comment.module';
import {
  MatProgressBarModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatFormFieldModule,
} from '@angular/material';
import {InteractionModule} from "../interaction/interaction.module";

@NgModule({
  declarations: [
    PlanComponent,
    RequestComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    ToolbarModule,
    PipesModule,
    MatButtonModule,
    MatTabsModule,
    PostModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    CommentModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    InteractionModule
  ],
})
export class PlanModule { }
