import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiResponse, Plan, User} from '../../../utility/models';
import {RelationshipService} from '../../../utility/services/relationship.service';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from '../../../utility/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../utility/services/auth.service';
import {WebSocketService} from '../../../utility/services/web-socket.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  selectFriendControl = new FormControl();
  selectedFriends: User[];
  selectedType = '1';
  profileUser: User;
  authUser: User;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private relationshipService: RelationshipService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.authUser = this.authService.currentUserValue;
    this.selectFriendControl.setValue(this.selectedType);
    const user$ = this.route.parent.paramMap.pipe(
      switchMap(paramMap =>
        this.userService.getUserDetail(paramMap.get('user_id'))
      )
    );
    user$.subscribe(res => {
      this.profileUser = res.data;
      this.relationshipService.getFriends(this.profileUser.id).subscribe(result => {
        if (result.data) {
          this.selectedFriends = result.data;
        }
      });
    });
    this.onTypeChange();
  }

  onTypeChange() {
    this.selectFriendControl.valueChanges
      .pipe(
        tap(val => this.selectedType = val)
      )
      .subscribe(val => {
        let friends$: Observable<ApiResponse>;
        if (val === '1') {
          friends$ = this.relationshipService.getFriends(this.profileUser.id);
        } else if (val === '2') {
          friends$ = this.relationshipService.getSentRequests();
        } else {
          friends$ = this.relationshipService.getReceivedRequests();
        }
        friends$.subscribe(res => {
          if (res.data) {
            this.selectedFriends = res.data;
          } else {
            this.selectedFriends = [];
          }
        });
      });
  }

  onCancel(recipientId: any) {
    this.relationshipService.cancelRequest(recipientId).subscribe(res => {
      if (res.data) {
        const index = this.selectedFriends.findIndex(friend => friend.id === +recipientId);
        this.selectedFriends.splice(index, 1);
      }
    });
  }

  onDecline(senderId: any) {
    this.relationshipService.declineRequest(senderId).subscribe(res => {
      if (res.data) {
        const index = this.selectedFriends.findIndex(friend => friend.id === +senderId);
        this.selectedFriends.splice(index, 1);
      }
    });
  }

  onConfirm(senderId: any) {
    console.log('confirmed');
    this.relationshipService.acceptRequest(senderId).subscribe(res => {
      if (res.data) {
        const index = this.selectedFriends.findIndex(friend => friend.id === +senderId);
        this.selectedFriends.splice(index, 1);
        const newRoom = 'friend_room_' + senderId;
        this.authService.updateUserRooms('friend', senderId);
        this.webSocketService.emit('new-room', newRoom);
      }
    });
  }

  onUnfriend(targetId: any) {
    this.relationshipService.unfriend(targetId).subscribe(res => {
      if (res.data) {
        const index = this.selectedFriends.findIndex(friend => friend.id === +targetId);
        this.selectedFriends.splice(index, 1);
        const oldRoom = 'friend_room_' + targetId;
        this.authService.removeUserRooms('friend', targetId);
        this.webSocketService.emit('leave-room', oldRoom);
      }
    });
  }

}
