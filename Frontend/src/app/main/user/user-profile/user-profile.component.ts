import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserUpdateAvatarDialogComponent} from '../dialogs/user-update-avatar-dialog/user-update-avatar-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models';
import {UserUpdateProfileDialogComponent} from '../dialogs/user-update-profile-dialog/user-update-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  tmpAvatar;
  updateAvatarDialogRef: MatDialogRef<UserUpdateAvatarDialogComponent>;
  updateProfileDialogRef: MatDialogRef<UserUpdateProfileDialogComponent>;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
  }
  onOpenUpdateAvatarDialog() {
    this.updateAvatarDialogRef = this.dialog.open(UserUpdateAvatarDialogComponent, {
      width: '400px',
      data: this.currentUser
    });
    this.updateAvatarDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.tmpAvatar = res;
      }
    });
  }
  onOpenUpdateProfileDialog() {
    this.updateProfileDialogRef = this.dialog.open(UserUpdateProfileDialogComponent, {
      width: '500px',
      data: this.currentUser
    });
    this.updateProfileDialogRef.afterClosed().subscribe(data => {
      if (data) {
        for (const key of Object.keys(data)) {
          this.currentUser[key] = data[key];
        }
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    });
  }

}
