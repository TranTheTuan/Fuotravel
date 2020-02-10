import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanService} from '../../services';
import {Plan} from '../../models/plan';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public plan$: Plan;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('plan_id');
    this.planService.getDetail(id).subscribe(res => {
      this.plan$ = res.data;
    });
  }

}
