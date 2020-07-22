import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../../../utility/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: Subject<any> = new Subject<any>();
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(formValue: any) {
    this.authService.login(formValue).subscribe(
      data => {
        this.router.navigate(['home']);
      },
      error => {
        this.error.next(error.error.message);
      }
    );
  }

  ngOnInit(): void {

  }

  onLoginWithProvider(provider: string) {
    this.authService.loginWithProvider(provider).subscribe(res => {
      // this.router.navigate(['home']);
    });
  }
}
