import {Component, OnInit} from '@angular/core';
import {AuthService, PlanService} from '../../services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public plan;
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('plan_id');
    this.planService.getDetail(id).subscribe(res => {
      this.plan = res.data;
    });
  }
}
