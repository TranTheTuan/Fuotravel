import { Component, OnInit } from '@angular/core';
import {Plan, User} from '../../../models';
import {AuthService} from '../../../services/auth.service';
import {PlanService} from '../../../services/plan.service';
import {FormControl} from '@angular/forms';
import {MemberService} from '../../../services/member.service';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";

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
  profileUser: User;
  authUser: User;
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private memberService: MemberService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authUser = this.authService.currentUserValue;
    this.selectedTypeControl.setValue(this.selectedType);
    const user$ = this.route.parent.paramMap.pipe(
      switchMap(paramMap =>
        this.userService.getUserDetail(paramMap.get('user_id'))
      )
    );
    user$.subscribe(res => {
      this.profileUser = res.data;
    });
    this.planService.getPlansOption(this.selectedType).subscribe(res => {
      if (Object.keys(res.data).length > 0) {
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
