import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  submitted = false;
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/plan']);
    }
  }
  onSubmit(formValue: any) {
    this.submitted = true;
    console.log(formValue.value);
    this.authService.login(formValue.value).subscribe(
      data => {
      console.log('Login successfully: ' + JSON.stringify(this.authService.currentUserValue));
      this.router.navigate(['home']);
    },
      error => {
      console.log('Server error: ' + error);
    }
    );
  }

  ngOnInit(): void {

  }

}
