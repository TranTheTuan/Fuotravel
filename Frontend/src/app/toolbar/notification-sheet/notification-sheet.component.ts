import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Notify} from '../../models/notify';

@Component({
  selector: 'app-notification-sheet',
  templateUrl: './notification-sheet.component.html',
  styleUrls: ['./notification-sheet.component.css']
})
export class NotificationSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<NotificationSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Notify[]
  ) { }

  ngOnInit(): void {
  }
  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
