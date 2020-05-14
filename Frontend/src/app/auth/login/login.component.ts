import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: Subject<any> = new Subject<any>();
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(3)]]
  });
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }
  onSubmit(formValue: any) {
    this.authService.login(formValue).subscribe(
      data => {
      console.log('Login successfully: ' + JSON.stringify(this.authService.currentUserValue));
      this.router.navigate(['home']);
    },
      error => {
        this.error.next(error.error.message);
    }
    );
  }

  ngOnInit(): void {

  }
  emailErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'Email is required' :
      this.loginForm.get('email').hasError('email') ? 'Not a valid email format' : '';
  }
  passwordErrorMessage() {
    return this.loginForm.get('password').hasError('required') ? 'Password is required' :
      this.loginForm.get('password').hasError('minlength') ? 'Password minimum length is 3' : '';
  }

}
