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
  public requesters: User[];
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('planRequesters')) {
      this.requesters = JSON.parse(localStorage.getItem('planRequesters'));
    } else {
      const id = this.route.snapshot.paramMap.get('plan_id');
      this.memberService.getMembers(id, PLAN, PENDING).subscribe(res => {
        this.requesters = res.data;
      }, error => console.log(error.error.message));
    }
  }

}
