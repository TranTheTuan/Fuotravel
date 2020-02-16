import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { OverviewComponent } from './overview/overview.component';
import { MatButtonModule } from '@angular/material/button';
import { RequestComponent } from './request/request.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {PipesModule} from '../pipes/pipes.module';


@NgModule({
  declarations: [PlanComponent, OverviewComponent, RequestComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    MatButtonModule,
    ToolbarModule,
    PipesModule
  ],
})
export class PlanModule { }
