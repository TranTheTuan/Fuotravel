import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Plan, User} from '../models';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UpdatePlanComponent} from '../layouts/update-plan/update-plan.component';
import {switchMap} from 'rxjs/operators';
import {PlanService} from '../services/plan.service';
import {MemberService} from '../services/member.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {ADMIN, MEMBER} from '../helpers';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  tmpCover = '';
  _MEMBER  = MEMBER;
  _ADMIN = ADMIN;
  links = [
    {path: 'here-map', label: 'Stages'},
    {path: 'discuss', label: 'Discuss'},
    {path: 'requests', label: 'Requests'},
    {path: 'members', label: 'Members'},
    {path: 'posts', label: 'Memories'}
  ];
  plan: Plan;
  currentUser: User;
  membership;
  inviteFriends: User[];
  friendForm = this.fb.group({
    friends: this.fb.array([])
  });

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private memberService: MemberService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    const plan$ = this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) =>
        this.planService.getDetail(paramMap.get('plan_id'))
      )
    );
    plan$.subscribe(res => {
      this.plan = res.data;
      this.memberService.getMembership(this.plan.id);
      this.getFriends();
    });
    this.memberService.getMembershipListener().subscribe(res => {
      this.membership = res;
    });
  }

  onInviteFriendsSubmit() {
    const selectedIds = this.friendForm.value.friends
      .map((v, i) => (v ? this.inviteFriends[i].id : null))
      .filter(v => v !== null);
    console.log(selectedIds);
    this.planService.inviteFriends(this.plan.id, selectedIds).subscribe(res => {
      this.matSnackBar.open('Sent invitations to your friends :))',
        'Close', { duration: 3000});
      this.friendForm.reset();
    });
  }

  getFriends() {
    this.planService.getInvitableFriends(this.plan.id).subscribe(res => {
      this.inviteFriends = res.data;
      console.log(this.inviteFriends);
      this.friendForm = this.fb.group({
        friends: this.buildFriendsArray(this.inviteFriends)
      });
    });
  }

  get friendsArray() {
    return this.friendForm.get('friends') as FormArray;
  }

  buildFriendsArray(friends: User[]) {
    const friendsArr = friends.map(friend => {
      return this.fb.control('');
    });
    return this.fb.array(friendsArr);
  }

  openDialog() {
    const dialogRef = this.matDialog.open(UpdatePlanComponent, {
      width: '500', height: '500',
      data: {plan: this.plan}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        for (const key of Object.keys(data)) {
          if (key !== 'cover' && data[key]) {
            this.plan[key] = data[key];
          }
          if (key === 'cover' && data[key]) {
            this.tmpCover = data[key];
          }
        }
      }
    });
  }
}
