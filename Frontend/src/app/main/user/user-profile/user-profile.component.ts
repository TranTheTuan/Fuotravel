import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserUpdateAvatarDialogComponent} from '../dialogs/user-update-avatar-dialog/user-update-avatar-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models';
import {UserUpdateProfileDialogComponent} from '../dialogs/user-update-profile-dialog/user-update-profile-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileUser: User;
  authUser: User;
  tmpAvatar;
  updateAvatarDialogRef: MatDialogRef<UserUpdateAvatarDialogComponent>;
  updateProfileDialogRef: MatDialogRef<UserUpdateProfileDialogComponent>;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authUser = this.authService.currentUserValue;
    const user$ = this.route.parent.paramMap.pipe(
      tap(paramMap => console.log(paramMap.get('user_id'))),
      switchMap(paramMap =>
        this.userService.getUserDetail(paramMap.get('user_id'))
      )
    );
    user$.subscribe(res => {
      this.profileUser = res.data;
    });
    console.log(this.profileUser);
  }
  onOpenUpdateAvatarDialog() {
    this.updateAvatarDialogRef = this.dialog.open(UserUpdateAvatarDialogComponent, {
      width: '400px',
      data: this.authUser
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
      data: this.authUser
    });
    this.updateProfileDialogRef.afterClosed().subscribe(data => {
      if (data) {
        for (const key of Object.keys(data)) {
          this.authUser[key] = data[key];
        }
        localStorage.setItem('currentUser', JSON.stringify(this.authUser));
      }
    });
  }

}
