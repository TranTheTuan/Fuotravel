import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanComponent } from './plan.component';
import {OverviewComponent} from './overview/overview.component';
import {RequestComponent} from './request/request.component';

const routes: Routes = [{ path: '', component: PlanComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'overview/:plan_id', component: OverviewComponent },
    { path: 'request/:plan_id', component: RequestComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
