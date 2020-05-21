import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {Router} from '@angular/router';
import {Plan, Tag} from '../models';
import {AuthService} from '../services/auth.service';
import {PlanService} from '../services/plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public plans: Plan[];
  public time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toLocaleTimeString().toString()), 1000);
  });
  authTags: Tag[];
  selectedTags: Tag[] = [];

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('plans')) {
      this.plans = JSON.parse(localStorage.getItem('plans'));
    } else {
      this.getPlans();
    }
    this.authTags = this.authService.currentUserValue.tags;
  }

  getPlans(tagIds: string = '') {
    this.planService.getAll('', tagIds).subscribe(res => {
      this.plans = res.data;
    }, error => console.log(error));
  }

  onSelectTag(tag: Tag) {
    tag.isSelected = !tag.isSelected;
    if (tag.isSelected) {
      this.selectedTags.push(tag);
    } else {
      const unSelectIndex = this.selectedTags.findIndex(i => i.id === tag.id);
      this.selectedTags.splice(unSelectIndex, 1);
    }
    this.getPlans(this.selectedTags.map(item => item.id).toString());
  }
}
