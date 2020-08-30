import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule, MatStepperModule, MatDialogModule
} from '@angular/material';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule, MomentDateModule} from '@angular/material-moment-adapter';
import {TagModule} from '../tag/tag.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatStepperModule,
    MatDialogModule,
    TagModule,
    // MomentDateModule
  ]
})
export class AuthModule {
}
