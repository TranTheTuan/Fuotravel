import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter, TAG_USER} from '../../../utility/helpers';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {dateFormat} from '../../../utility/helpers/date-format';
import {AuthService} from '../../../utility/services/auth.service';
import {UserService} from '../../../utility/services/user.service';

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
  TAG_USER = TAG_USER;
  error: Subject<any> = new Subject<any>();
  registerForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    gender: [''],
    birthday: [''],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(3)]]
  });
  avatarData = new FormData();
  userId;

  constructor(
    private authService: AuthService,
    private  userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(formValue: any) {
    formValue.birthday = dateFormat(formValue.birthday);
    console.table(formValue);
    this.authService.register(formValue).subscribe(
      res => {
        this.userId = res.data.id;
        this.snackBar.open('Registered successfully', 'Close', {duration: 3000});
        // this.router.navigate(['/tag/add']);
      },
      error => {
        this.error.next(error.error.message);
      }
    );
  }

  onUpdateAvatar() {
    this.avatarData.append('_method', 'put');
    this.userService.updateAvatar(this.avatarData, this.userId).subscribe(res => {
      const authUser = this.authService.currentUserValue;
      authUser.avatar = res.data;
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      this.snackBar.open('Avatar updated successfully', 'Close', {duration: 3000});
    });
  }

  onGoHome() {
    this.router.navigate(['/home']);
  }

  onFileChange(event) {
    const file: File = event.target.files[0];
    this.avatarData.append('avatar', file);
    // this.createPlanForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }
}

