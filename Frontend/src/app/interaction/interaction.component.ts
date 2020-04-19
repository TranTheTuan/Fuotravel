import {Component, Input, OnInit} from '@angular/core';
import {MemberService} from '../services/member.service';
import {AuthService} from '../services';
import {ADMIN, BANNED, FOLLOWING, MEMBER, MODERATOR, PENDING} from '../helpers';

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
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
  }
  onSendRequest() {
    this.memberService.join(this.planId);
  }
  onUnfollow() {
    this.memberService.unfollow(this.planId);
  }
  onFollow() {
    this.memberService.follow(this.planId);
  }
  onLeave() {
    this.memberService.leave(this.planId);
  }
}
