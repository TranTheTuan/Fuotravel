import { Component, OnInit } from '@angular/core';
import {AuthService, PlanService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  public unAuth = true;
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router
  ) {}
  ngOnInit(): void {
  }

}
