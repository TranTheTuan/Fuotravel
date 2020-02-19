import { Component, OnInit } from '@angular/core';
import {User} from '../../models';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute} from '@angular/router';
import {MEMBER, PLAN} from '../../helpers';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  public members: User[];
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.parent.snapshot.paramMap.get('plan_id');
    this.memberService.getMembers(id, PLAN, MEMBER).subscribe(res => {
      this.members = res.data;
    }, error => console.log(error.error.message));
  }

}
