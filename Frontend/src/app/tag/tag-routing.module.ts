import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTagComponent} from './add-tag/add-tag.component';
import {TagComponent} from './tag.component';


const routes: Routes = [
  { path: '', component: TagComponent, children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'add', component: AddTagComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
