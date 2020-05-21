import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Plan, User} from '../models';
import {MatDialog} from '@angular/material';
import {UpdatePlanComponent} from '../layouts/update-plan/update-plan.component';
import {switchMap} from 'rxjs/operators';
import {PlanService} from '../services/plan.service';
import {MemberService} from '../services/member.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  tmpCover = '';
  links = [
    {path: 'discuss', label: 'Discuss'},
    {path: 'requests', label: 'Requests'},
    {path: 'members', label: 'Members'},
    {path: 'posts', label: 'Memories'}
  ];
  plan: Plan;
  currentUser: User;
  membership;

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    const plan$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) =>
        this.planService.getDetail(paramMap.get('plan_id'))
      )
    );
    plan$.subscribe(res => {
      this.plan = res.data;
      this.memberService.getMembership(this.plan.id);
    });
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(UpdatePlanComponent, {
      width: '500', height: '500',
      data: {plan: this.plan}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        for (const key of Object.keys(data)) {
          if (key !== 'cover' && data[key]) {
            this.plan[key] = data[key];
          }
          if (key === 'cover' && data[key]) {
            this.tmpCover = data[key];
          }
        }
      }
    });
  }
}
