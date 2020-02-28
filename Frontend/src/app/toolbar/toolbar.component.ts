import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../services';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlanCreateComponent} from '../layouts/plan-create/plan-create.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(PlanCreateComponent, {
      width: '500', height: '500'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

}
