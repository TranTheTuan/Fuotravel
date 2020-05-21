import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../helpers';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {dateFormat} from '../../helpers/date-format';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class RegisterComponent implements OnInit {
  preview = null;
  public error: Subject<any> = new Subject<any>();
  registerForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', [Validators.required]],
    birthday: [''],
    avatar: [''],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  onSubmit(formValue: any) {
    formValue.birthday = dateFormat(formValue.birthday);
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

  onFileChange(event) {
    const file: File = event.target.files[0];
    this.registerForm.patchValue({
      avatar: file
    });
    // this.createPlanForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
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

  phoneErrorMessage() {
    const phone = this.registerForm.get('phone');
    return phone.hasError('required') ? 'Phone number is required' :
      phone.hasError('minlength') ? 'Phone number minimum length is 5' :
        phone.hasError('maxlength') ? 'Phone number maximum length is 11' : '';
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

