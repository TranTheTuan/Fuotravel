import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../services';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Plan} from '../models';
import {PLAN} from '../helpers';
import {MatDialog} from '@angular/material';
import {UpdatePlanComponent} from '../layouts/update-plan/update-plan.component';
import {switchMap} from 'rxjs/operators';

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
    const plan$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) =>
        this.planService.getDetail(paramMap.get('plan_id'))
      )
    );
    plan$.subscribe(res => this.plan = res.data);
  }
  openDialog() {
    const dialogRef = this.matDialog.open(UpdatePlanComponent, {
      width: '500', height: '500',
      data: { plan: this.plan}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        for (const key of Object.keys(data)) {
          if (data[key]) {
            this.plan[key] = data[key];
          }
        }
      }
    });
  }
}
