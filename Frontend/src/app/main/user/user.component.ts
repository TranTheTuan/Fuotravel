import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../utility/services/auth.service';
import {User} from '../../utility/models';
import {switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../utility/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  profileUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const user$ = this.route.paramMap.pipe(
      switchMap(paramMap =>
        this.userService.getUserDetail(paramMap.get('user_id'))
      )
    );
    user$.subscribe(res => {
      this.profileUser = res.data;
    });
  }

}
