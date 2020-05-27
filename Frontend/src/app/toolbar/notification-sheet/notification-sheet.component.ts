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

  constructor(
    private bottomSheetRef: MatBottomSheetRef<NotificationSheetComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Notify[]
  ) { }

  ngOnInit(): void {
  }
  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
  markAsRead(notificationId: any) {
    this.notificationService.markAsRead(notificationId).subscribe(res => {
      if (res.data) {
        const notifyIndex = this.data.findIndex(notify => notify.id === notificationId);
        this.data[notifyIndex].readAt = (new Date()).toDateString();
      }
    });
  }

}
