import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from './services';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Fuotravel';
  public unAuth = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  logout() {
    this.authService.logout();
    this.unAuth = true;
    this.router.navigate(['auth']);
  }
  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.unAuth = false;
    }
    debugger
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.authService.currentUserValue) {
      this.unAuth = false;
    }
  }
}
