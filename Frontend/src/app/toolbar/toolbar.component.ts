import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnChanges {
  public unAuth = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.unAuth = false;
    }
    console.log(this.unAuth);
  }
  logout() {
    this.authService.logout();
    this.unAuth = true;
    this.router.navigate(['auth']);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.authService.currentUserValue) {
      this.unAuth = false;
    }
  }

  ngOnInit(): void {
  }

}
