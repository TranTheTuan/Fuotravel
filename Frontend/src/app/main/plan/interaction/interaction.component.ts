import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../utility/services/auth.service';
import {ADMIN, BANNED, FOLLOWING, MEMBER, MODERATOR, PENDING} from '../../../utility/helpers';
import {MemberService} from '../../../utility/services/member.service';
import {WebSocketService} from '../../../utility/services/web-socket.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() planId;
  @Input() planStatus: boolean;
  @Input() membership: Array<number>;
  readonly _PENDING = PENDING;
  readonly _MEMBER = MEMBER;
  readonly _FOLLOWING = FOLLOWING;
  readonly _BANNED = BANNED;
  readonly _ADMIN = ADMIN;
  readonly _MODERATOR = MODERATOR;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private memberService: MemberService
  ) {
  }

  ngOnInit(): void {
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
  }

  onSendRequest() {
    if (!this.authService.checkAuth()) {
      return;
    }
    this.memberService.join(this.planId);
    const newRoom = 'plan_room_' + this.planId;
    this.authService.updateUserRooms('plan', this.planId);
    this.webSocketService.emit('new-room', newRoom);
  }

  onUnfollow() {
    if (!this.authService.checkAuth()) {
      return;
    }
    this.memberService.unfollow(this.planId);
    const oldRoom = 'plan_room_' + this.planId;
    this.authService.removeUserRooms('plan', this.planId);
    this.webSocketService.emit('leave-room', oldRoom);
  }

  onFollow() {
    if (!this.authService.checkAuth()) {
      return;
    }
    this.memberService.follow(this.planId);
    const newRoom = 'plan_room_' + this.planId;
    this.authService.updateUserRooms('plan', this.planId);
    this.webSocketService.emit('new-room', newRoom);
  }

  onLeave() {
    if (!this.authService.checkAuth()) {
      return;
    }
    this.memberService.leave(this.planId);
    const oldRoom = 'plan_room_' + this.planId;
    this.authService.removeUserRooms('plan', this.planId);
    this.webSocketService.emit('leave-room', oldRoom);
  }
}
