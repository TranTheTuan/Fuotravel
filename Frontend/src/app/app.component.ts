import { Component } from '@angular/core';
import {AuthService} from './services';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fuotravel';
  public unAuth = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.currentUserValue) {
      this.unAuth = false;
    }
  }
  logout() {
    this.authService.logout();
    this.unAuth = true;
    this.router.navigate(['auth']);
  }
}
