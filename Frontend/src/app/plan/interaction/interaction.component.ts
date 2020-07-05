import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ADMIN, BANNED, FOLLOWING, MEMBER, MODERATOR, PENDING} from '../../helpers';
import {MemberService} from '../../services/member.service';
import {WebSocketService} from '../../services/web-socket.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() planId;
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
  }

  onSendRequest() {
    this.memberService.join(this.planId);
    const newRoom = 'plan_room_' + this.planId;
    this.authService.updateUserRooms('plan', this.planId);
    this.webSocketService.emit('new-room', newRoom);
  }

  onUnfollow() {
    this.memberService.unfollow(this.planId);
    const oldRoom = 'plan_room_' + this.planId;
    this.authService.removeUserRooms('plan', this.planId);
    this.webSocketService.emit('leave-room', oldRoom);
  }

  onFollow() {
    this.memberService.follow(this.planId);
    const newRoom = 'plan_room_' + this.planId;
    this.authService.updateUserRooms('plan', this.planId);
    this.webSocketService.emit('new-room', newRoom);
  }

  onLeave() {
    this.memberService.leave(this.planId);
    const oldRoom = 'plan_room_' + this.planId;
    this.authService.removeUserRooms('plan', this.planId);
    this.webSocketService.emit('leave-room', oldRoom);
  }
}
