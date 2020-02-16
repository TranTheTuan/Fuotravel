import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../helpers';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter},
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class RegisterComponent implements OnInit {
  public error: Subject<any> = new Subject<any>();
  registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', [Validators.required]],
    birthday: [''],
    // avatar: [''],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  onSubmit(formValue: any) {
    formValue.birthday = this.formatDate(formValue.birthday);
    console.table(formValue);
    this.authService.register(formValue).subscribe(
      data => {
        console.log('Registered successfully: ' + JSON.stringify(this.authService.currentUserValue));
        this.router.navigate(['/tag/add']);
      },
      error => {
        this.error.next(error.error.message);
      }
    );
  }
  ngOnInit(): void {
  }
  private formatDate(value: any) {
    return moment(value).format('YYYY/MM/DD');
  }
  firstlastnameErrorMessage(name: string) {
    const namefield = this.registerForm.get(name);
    return namefield.hasError('required') ? `${name} is required` :
      namefield.hasError('minlength') ? `${name} minimum length is 2` : '';
  }
  birthdayErrorMessage() {
    return this.registerForm.get('birthday').hasError('required') ? 'Birthday is required' : '';
  }
  genderErrorMessage() {
    return this.registerForm.get('gender').hasError('required') ? 'Gender is required' : '';
  }
  usernameErrorMessage() {
    return this.registerForm.get('username').hasError('required') ? 'Username is required' :
      this.registerForm.get('username').hasError('minlength') ? 'Username minimum length is 6' : '';
  }
  emailErrorMessage() {
    return this.registerForm.get('email').hasError('required') ? 'Email is required' :
      this.registerForm.get('email').hasError('email') ? 'Not a valid email format' : '';
  }
  passwordErrorMessage() {
    return this.registerForm.get('password').hasError('required') ? 'Password is required' :
      this.registerForm.get('password').hasError('minlength') ? 'Password minimum length is 3' : '';
  }

}

