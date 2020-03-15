import { Component, OnInit } from '@angular/core';
import {User} from '../../models';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute} from '@angular/router';
import {MEMBER, PLAN, ADMIN, MODERATOR} from '../../helpers';
import {MatSnackBar} from '@angular/material/snack-bar';
import {openSnackbar} from '../../helpers/snackbar';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  public readonly _PLAN = PLAN;
  public readonly _ADMIN = ADMIN;
  public readonly _MODERATOR = MODERATOR;
  public planId;
  public members: User[];
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  promote(userId: any, memberableId: any, memberable: any, role: any) {
    this.memberService.promote(userId, memberableId, memberable, role)
      .subscribe(res => {
        this.snackBar.open('User has been promoted, cheers :D',
          'Close', {duration: 3000});
      });
  }
  discharge(userId: any, memberableId: any, memberable: any, role: any) {
    this.memberService.discharge(userId, memberableId, memberable, role)
      .subscribe(res => {
        this.snackBar.open('User has been discharged, corrupt :(',
          'Close', {duration: 3000});
      });
  }
  kick(userId: any, memberableId: any, memberable: any) {
    this.memberService.kick(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.members.indexOf(userId);
        this.members.splice(userIndex, 1);
        this.snackBar.open('User has been kicked out, what a dick >:(',
          'Close', {duration: 3000});
      });
  }
  ban(userId: any, memberableId: any, memberable: any) {
    this.memberService.ban(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.members.indexOf(userId);
        this.members.splice(userIndex, 1);
        this.snackBar.open('User has been banned, dick head >:(',
          'Close', {duration: 3000});
      });
  }
  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembers(this.planId, PLAN, MEMBER).subscribe(res => {
      this.members = res.data;
    }, error => console.log(error.error.message));
  }

}