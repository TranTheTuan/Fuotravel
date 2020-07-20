import {Component, OnInit} from '@angular/core';
import {User} from '../../../utility/models';
import {MemberService} from '../../../utility/services/member.service';
import {ActivatedRoute} from '@angular/router';
import {MEMBER, ADMIN, MODERATOR} from '../../../utility/helpers';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  readonly _ADMIN = ADMIN;
  readonly _MODERATOR = MODERATOR;
  membership: Array<number>;
  planId;
  members: User[];

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
    this.memberService.getMembers(this.planId, MEMBER).subscribe(res => {
      this.members = res.data;
      console.log(this.members);
    }, error => console.log(error.error.message));
  }

  onPromote(userId: any, planId: any, role: any) {
    this.memberService.promote(userId, planId, role)
      .subscribe(res => {
        this.snackBar.open('User has been promoted, cheers :D',
          'Close', {duration: 3000});
      });
  }

  onDischarge(userId: any, planId: any, role: any) {
    this.memberService.discharge(userId, planId, role)
      .subscribe(res => {
        this.snackBar.open('User has been discharged, corrupt :(',
          'Close', {duration: 3000});
      });
  }

  onKick(userId: any, planId: any) {
    this.memberService.kick(userId, planId)
      .subscribe(res => {
        const userIndex = this.members.findIndex(user => user.id === +userId);
        this.members.splice(userIndex, 1);
        this.snackBar.open('User has been kicked out, what a dick >:(',
          'Close', {duration: 3000});
      });
  }

  onBan(userId: any, planId: any) {
    this.memberService.ban(userId, planId)
      .subscribe(res => {
        const userIndex = this.members.findIndex(user => user.id === +userId);
        this.members.splice(userIndex, 1);
        this.snackBar.open('User has been banned, dick head >:(',
          'Close', {duration: 3000});
      });
  }

}
