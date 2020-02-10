import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public unAuth = true;
  public canDisplay;
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
  ngOnInit(): void {
  }

}
