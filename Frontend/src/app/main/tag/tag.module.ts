import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTagComponent } from './add-tag/add-tag.component';
import {
  MatButtonModule, MatCheckboxModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TagRoutingModule} from './tag-routing.module';
import { TagComponent } from './tag.component';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [AddTagComponent, TagComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule
  ],
  exports: [
    TagComponent
  ]
})
export class TagModule { }
