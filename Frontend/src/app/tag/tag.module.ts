import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTagComponent } from './add-tag/add-tag.component';
import {
  MatButtonModule, MatCheckboxModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TagRoutingModule} from './tag-routing.module';
import { TagComponent } from './tag.component';
import {ToolbarModule} from '../toolbar/toolbar.module';


@NgModule({
  declarations: [AddTagComponent, TagComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    ToolbarModule
  ]
})
export class TagModule { }
