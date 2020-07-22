import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../utility/helpers';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {dateFormat} from '../../../utility/helpers/date-format';
import {AuthService} from '../../../utility/services/auth.service';

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
  error: Subject<any> = new Subject<any>();
  registerForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    gender: [''],
    birthday: [''],
    avatar: [''],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(formValue: any) {
    formValue.birthday = dateFormat(formValue.birthday);
    console.table(formValue);
    this.authService.register(formValue).subscribe(
      data => {
        this.router.navigate(['/tag/add']);
      },
      error => {
        this.error.next(error.error.message);
      }
    );
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
}

