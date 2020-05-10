import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService, PlanService} from '../services';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlanCreateComponent} from '../layouts/plan-create/plan-create.component';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isSearching = false;
  searchControl = new FormControl();
  suggestPlans = [];
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onSearch();
  }
  onSearch() {
    this.searchControl.valueChanges.pipe(
      filter(val => val.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap(input => this.planService.getAll(input)
        .pipe(
          finalize(() => this.isSearching = false)
        ))
    ).subscribe(res => {
      this.suggestPlans = res.data;
    });
  }
  onDisplayValue(planId: any) {
    const index = this.suggestPlans.findIndex(plan => plan.id === planId);
    return (index !== -1) ? this.suggestPlans[index].title : '';
  }
  onSuggestionClick(planId: any) {
    this.router.navigate(['/plans/' + planId + '/discuss']);
  }
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
}
