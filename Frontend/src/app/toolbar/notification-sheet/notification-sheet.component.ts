import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Notify} from '../../models/notify';
import {Observable} from 'rxjs';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification-sheet',
  templateUrl: './notification-sheet.component.html',
  styleUrls: ['./notification-sheet.component.css']
})
export class NotificationSheetComponent implements OnInit {
  notifications: Notify[] = [];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<NotificationSheetComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Notify[]
  ) { }

  ngOnInit(): void {
    // this.notificationService.getAllNotifications();
    this.notificationService.notificationListener.subscribe(res => {
      if (res) {
        this.notifications = res;
      }
    });
  }
  openLink(notify: Notify) {
    if (notify.readAt == null) {
      this.markAsRead(notify.id);
      console.log(this.notifications);
    }
    // event.preventDefault();
  }
  markAsRead(notificationId: any) {
    this.notificationService.markAsRead(notificationId);
  }

}
