import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {
  }

}
