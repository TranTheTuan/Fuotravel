import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Plan} from '../models';
import {PLAN} from '../helpers';
import {MatDialog} from '@angular/material';
import {UpdatePlanComponent} from '../layouts/update-plan/update-plan.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  _PLAN = PLAN;
  public links = [];
  public plan: Plan;
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('plan_id');
    this.links = [
      { path: 'discuss', label: 'Discuss' },
      { path: 'requests', label: 'Requests' },
      { path: 'members', label: 'Members' },
      { path: 'posts', label: 'Memories' }
      ];
    // this.planService.getDetail(id).subscribe(res => {
    //   if (res.data) {
    //     this.plan = res.data;
    //   }
    // });
    this.planService.getPlan(id);
    this.planService.getPlanListener().subscribe(res => {
      this.plan = res;
    });
  }
  openDialog() {
    const dialogRef = this.matDialog.open(UpdatePlanComponent, {
      width: '500', height: '500',
      data: { plan: this.plan}
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}
