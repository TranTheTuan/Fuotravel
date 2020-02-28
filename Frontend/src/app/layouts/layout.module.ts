import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanCreateComponent} from './plan-create/plan-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [PlanCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  exports: [PlanCreateComponent]
})
export class LayoutModule { }
