import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../../services';
import {Router} from '@angular/router';
import {User} from '../../models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public isAuth = true;
  public plans = [];
  constructor(private authService: AuthService,
              private planService: PlanService,
              private router: Router) {
    if (this.authService.currentUserValue) {
      this.isAuth = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  getPlans() {
    this.planService.getAll().subscribe(res => {
      console.log(res.data);
      this.plans = res.data;
    }, error => localStorage.setItem('error', error));
  }
  ngOnInit(): void {
    this.getPlans();
  }

}
