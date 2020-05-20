import { Component, OnInit } from '@angular/core';
import {Plan, User} from '../../../models';
import {AuthService} from '../../../services/auth.service';
import {PlanService} from '../../../services/plan.service';
import {FormControl} from '@angular/forms';
import {MemberService} from '../../../services/member.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-plans',
  templateUrl: './user-plans.component.html',
  styleUrls: ['./user-plans.component.css']
})
export class UserPlansComponent implements OnInit {
  currentUser: User;
  selectedTypeControl = new FormControl();
  selectedPlans: Plan[] = [];
  selectedType = '0';
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.selectedTypeControl.setValue(this.selectedType);
    this.planService.getPlansOption(this.selectedType).subscribe(res => {
      if (Object.keys(res.data).length > 0) {
        console.log(res.data);
        this.selectedPlans = res.data;
      }
      // console.log(this.selectedPlans);
    });
    this.onTypeChange();
  }
  onTypeChange() {
    this.selectedTypeControl.valueChanges
      .pipe(
        tap(val => this.selectedType = val)
      )
      .subscribe(val => {
      this.planService.getPlansOption(val).subscribe(res => {
        if (Object.keys(res.data).length > 0) {
          this.selectedPlans = res.data;
        } else {
          this.selectedPlans = [];
        }
      });
    });
  }
  onUnfollow(planId: any) {
    this.memberService.unfollow(planId);
    const planIndex = this.selectedPlans.findIndex(plan => plan.id === planId);
    this.selectedPlans.splice(planIndex, 1);
  }
  onLeave(planId: any) {
    this.memberService.leave(planId);
    const planIndex = this.selectedPlans.findIndex(plan => plan.id === planId);
    this.selectedPlans.splice(planIndex, 1);
  }

}
