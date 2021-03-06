import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserUpdateAvatarDialogComponent} from '../dialogs/user-update-avatar-dialog/user-update-avatar-dialog.component';
import {AuthService} from '../../../utility/services/auth.service';
import {User} from '../../../utility/models';
import {UserUpdateProfileDialogComponent} from '../dialogs/user-update-profile-dialog/user-update-profile-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../../utility/services/user.service';
import {RelationshipService} from '../../../utility/services/relationship.service';
import {WebSocketService} from '../../../utility/services/web-socket.service';

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
  relationshipBetween;
  isAuthStart = false;
  isTargetStart = false;
  isPending = false;
  isFriend = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private userService: UserService,
    private relationshipService: RelationshipService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUserListener.subscribe(user => {
      this.authUser = user;
    });
    const user$ = this.route.parent.paramMap.pipe(
      switchMap(paramMap =>
        this.userService.getUserDetail(paramMap.get('user_id'))
      )
    );
    user$.subscribe(res => {
      this.profileUser = res.data;
      this.relationshipService.getRelationshipBetween(this.profileUser.id)
        .subscribe(relationship => {
          this.setRelationshipStatus(relationship.data);
        });
    });
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
          this.profileUser[key] = data[key];
        }
        localStorage.setItem('currentUser', JSON.stringify(this.authUser));
      }
    });
  }

  setRelationshipStatus(data: any) {
    this.relationshipBetween = data;
    if (this.relationshipBetween) {
      this.isAuthStart = this.relationshipBetween.first_user_id === this.authUser.id;
      this.isTargetStart = this.relationshipBetween.first_user_id === this.profileUser.id;
      this.isPending = this.relationshipBetween.status === 1;
      this.isFriend = this.relationshipBetween.status === 2;
    } else {
      this.isAuthStart = false;
      this.isTargetStart = false;
      this.isPending = false;
      this.isFriend = false;
    }
  }

  onUnfriend(targetId: any) {
    this.relationshipService.unfriend(targetId).subscribe(res => {
      if (res.data) {
        this.setRelationshipStatus(null);
        const oldRoom = 'friend_room_' + targetId;
        this.authService.removeUserRooms('friend', targetId);
        this.webSocketService.emit('leave-room', oldRoom);
      }
    });
  }

  onSendRequest(targetId: any) {
    this.relationshipService.sendRequest(targetId).subscribe(res => {
      if (res.data) {
        this.setRelationshipStatus(res.data);
      }
    });
  }

  onCancel(targetId: any) {
    this.relationshipService.cancelRequest(targetId).subscribe(res => {
      if (res.data) {
        this.setRelationshipStatus(null);
      }
    });
  }

  onAccept(targetId: any) {
    this.relationshipService.acceptRequest(targetId).subscribe(res => {
      if (res.data) {
        this.setRelationshipStatus(res.data);
        const newRoom = 'friend_room_' + targetId;
        this.authService.updateUserRooms('friend', targetId);
        this.webSocketService.emit('new-room', newRoom);
      }
    });
  }

  onDecline(targetId: any) {
    this.relationshipService.declineRequest(targetId).subscribe(res => {
      if (res.data) {
        this.setRelationshipStatus(null);
      }
    });
  }

}
