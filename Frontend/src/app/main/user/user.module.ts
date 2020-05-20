import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from './user.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPlansComponent } from './user-plans/user-plans.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import {ToolbarModule} from '../../toolbar/toolbar.module';
import { UserUpdateAvatarDialogComponent } from './dialogs/user-update-avatar-dialog/user-update-avatar-dialog.component';
import {PipesModule} from '../../pipes/pipes.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserUpdateProfileDialogComponent } from './dialogs/user-update-profile-dialog/user-update-profile-dialog.component';


@NgModule({
  declarations: [UserComponent, UserProfileComponent, UserPlansComponent, UserFriendsComponent, UserUpdateAvatarDialogComponent, UserUpdateProfileDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule,
    ToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    PipesModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule
  ]
})
export class UserModule { }
