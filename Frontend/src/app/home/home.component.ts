import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../services';
import {Observable, Observer} from 'rxjs';
import {Router} from '@angular/router';
import {Plan} from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public plans: Plan[];
  public time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toLocaleTimeString().toString()), 1000);
  });
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
  getPlans() {
    this.planService.getAll().subscribe(res => {
      this.plans = res.data;
    }, error => console.log(error));
  }
  ngOnInit(): void {
    if (localStorage.getItem('plans')) {
      this.plans = JSON.parse(localStorage.getItem('plans'));
    } else {
      this.getPlans();
    }
  }

}
