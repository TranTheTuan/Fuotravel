import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models';
import {MemberService} from '../../services/member.service';
import {PLAN, PENDING} from '../../helpers';

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
    private route: ActivatedRoute
  ) {}
  accept(userId: any, memberableId: any, memberable: any) {
    this.memberService.accept(userId, memberableId, memberable)
      .subscribe(res => {
        const userIndex = this.requesters.indexOf(res.data.user_id);
        this.requesters.splice(userIndex, 1);
      });
  }
  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembers(this.planId, this._PLAN, PENDING).subscribe(res => {
      this.requesters = res.data;
    }, error => console.log(error.error.message));
  }

}
