import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlanCreateComponent} from '../layouts/plan-create/plan-create.component';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';
import {Tag} from '../models';
import {AuthService} from '../services/auth.service';
import {PlanService} from '../services/plan.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isSearching = false;
  searchControl = new FormControl();
  suggestPlans = [];
  authTags: Tag[];
  selectedTags: Tag[] = [];
  @Output() tagsSelected = new EventEmitter();
  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onSearch();
    this.authTags = this.authService.currentUserValue.tags;
  }
  onSearch() {
    this.searchControl.valueChanges.pipe(
      filter(val => val.length >= 2),
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
    this.searchControl.setValue('');
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
  onSelectTag(tag: Tag) {
    tag.isSelected = !tag.isSelected;
    if (tag.isSelected) {
      this.selectedTags.push(tag);
    } else {
      const unSelectIndex = this.selectedTags.findIndex(i => i.id === tag.id);
      this.selectedTags.splice(unSelectIndex, 1);
    }
    this.tagsSelected.emit(this.selectedTags.map(item => item.id).toString());
    // this.router.navigate(['/']);
  }
}
