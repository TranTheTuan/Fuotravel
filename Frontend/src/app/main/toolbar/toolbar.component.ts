import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlanCreateComponent} from './plan-create/plan-create.component';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap} from 'rxjs/operators';
import {Tag, User} from '../../utility/models';
import {AuthService} from '../../utility/services/auth.service';
import {PlanService} from '../../utility/services/plan.service';
import {WebSocketService} from '../../utility/services/web-socket.service';
import {Notify} from '../../utility/models/notify';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {NotificationSheetComponent} from './notification-sheet/notification-sheet.component';
import {NotificationService} from '../../utility/services/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  currentUser: User;
  isSearching = false;
  searchControl = new FormControl();
  suggestPlans = [];
  notifications: Notify[] = [];
  unreadNotificationsNumber = 0;
  @Output() tagsSelected = new EventEmitter();

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private notificationService: NotificationService,
    private webSocketService: WebSocketService,
    private router: Router,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit(): void {
    this.onSearch();
    // this.currentUser = this.authService.currentUserValue;
    this.authService.currentUserListener.subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser) {
      this.notificationsListener();
      this.socketInteraction();
    }
  }

  notificationsListener() {
    this.notificationService.getAllNotifications();
    this.notificationService.unreadListener.subscribe(res => {
      this.unreadNotificationsNumber = res;
    });
    this.notificationService.notificationListener.subscribe(res => {
      if (res) {
        this.notifications = res;
      }
    });
  }

  socketInteraction() {
    this.webSocketService.emit('hello', 'hello');
    this.webSocketService.listen('welcome').subscribe();
    this.webSocketService.emit('init', this.currentUser.roomData);
    this.webSocketService.listen('init-res').subscribe();
    this.webSocketService.listen('send-notification').subscribe((res: Notify) => {
      if (res && res.sender.id !== this.currentUser.id) {
        this.notifications.unshift(res);
        this.notificationService.setUnread();
      }
    });
  }

  onSearch() {
    this.searchControl.valueChanges.pipe(
      filter(val => val !== undefined && val.length >= 2),
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

  openPlanCreateDialog() {
    const dialogRef = this.dialog.open(PlanCreateComponent, {
      width: '500', height: '500'
    });
    dialogRef.afterClosed().subscribe();
  }

  openNotificationSheet() {
    this.bottomSheet.open(NotificationSheetComponent, {
      data: this.notifications
    });
  }
}
