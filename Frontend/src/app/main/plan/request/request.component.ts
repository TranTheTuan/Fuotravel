import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../utility/models';
import {MemberService} from '../../../utility/services/member.service';
import {PLAN, PENDING, ADMIN, MODERATOR} from '../../../utility/helpers';
import io from 'socket.io-client';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  planId;
  requesters: User[];
  membership: Array<number>;
  _ADMIN = ADMIN;
  _MODERATOR = MODERATOR;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembers(this.planId, PENDING).subscribe(res => {
      this.requesters = res.data;
    }, error => console.log(error.error.message));
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
  }

  onAccept(userId: any, planId: any) {
    this.memberService.accept(userId, planId)
      .subscribe(res => {
        const userIndex = this.requesters.findIndex(user => user.id === +userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('Users request has been accepted, yo :D',
          'Close', {duration: 3000});
      });
  }

  onDecline(userId: any, planId: any) {
    this.memberService.decline(userId, planId)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('Users request has been declined, awww ):O',
          'Close', {duration: 3000});
      });
  }

  onBan(userId: any, planId: any) {
    this.memberService.ban(userId, planId)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('User has been banned, dick head >:(',
          'Close', {duration: 3000});
      });
  }
}
