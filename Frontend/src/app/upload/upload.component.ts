import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UploadService} from '../services/upload.service';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() isMultiple: boolean;
  constructor(public dialog: MatDialog) { }
  public openUploadDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
      data: {isMultiple: this.isMultiple}
    });
  }
  ngOnInit(): void {
  }

}
