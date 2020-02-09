import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanComponent } from './plan.component';
import {OverviewComponent} from './overview/overview.component';
import {RequestComponent} from './request/request.component';

const routes: Routes = [{ path: '', component: PlanComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'request', component: RequestComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
