import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanCreateComponent} from './plan-create/plan-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from "@angular/material/button";
import {UpdatePlanComponent} from './update-plan/update-plan.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [PlanCreateComponent, UpdatePlanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [PlanCreateComponent, UpdatePlanComponent]
})
export class LayoutModule { }
