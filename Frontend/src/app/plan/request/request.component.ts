import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models';
import {MemberService} from '../../services/member.service';
import {PLAN, PENDING} from '../../helpers';
import io from 'socket.io-client';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {openSnackbar} from '../../helpers/snackbar';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public readonly _PLAN = PLAN;
  public planId;
  public requesters: User[];
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  accept(userId: any, memberableId: any, memberable: any) {
    this.memberService.accept(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('Users request has been accepted, yo :D',
          'Close', {duration: 3000});
      });
  }
  decline(userId: any, memberableId: any, memberable: any) {
    this.memberService.decline(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('Users request has been declined, awww ):O',
          'Close', {duration: 3000});
      });
  }
  ban(userId: any, memberableId: any, memberable: any) {
    this.memberService.ban(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(userId);
        this.requesters.splice(userIndex, 1);
        this.snackBar.open('User has been banned, dick head >:(',
          'Close', {duration: 3000});
      });
  }
  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembers(this.planId, this._PLAN, PENDING).subscribe(res => {
      this.requesters = res.data;
    }, error => console.log(error.error.message));
    const socket = io(environment.socket);
    socket.on('fuotravel_database_chat:message', (data) => {
      this.snackBar.open(data.data, 'Close', {duration: 3000});
    });
  }
  saveme() {
    this.http.get(environment.apiURL + '/draft').subscribe();
  }
}
