import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Plan} from '../models';
import {PLAN} from "../helpers";

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
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('plan_id');
    this.links = [
      { path: 'discuss', label: 'Discuss' },
      { path: 'requests', label: 'Requests' },
      { path: 'members', label: 'Members' },
      { path: 'posts', label: 'Memories' }
      ];
    this.planService.getDetail(id).subscribe(res => {
      this.plan = res.data;
    });
  }
}
