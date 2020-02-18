import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UploadService} from '../../services/upload.service';
import {forkJoin} from 'rxjs';

export interface DialogData {
  isMultiple: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  @ViewChild('file') file;
  public files: Set<File> = new Set();
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              public uploadService: UploadService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  addFile() {
    this.file.nativeElement.click();
  }
  onFilesAdded() {
    const files: {[key: string]: File} = this.file.nativeElement.files;
    for (const key in files) {
      // tslint:disable-next-line:radix
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }
  closeDialog() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
    this.uploading = true;
    this.progress = this.uploadService.upload(this.files);
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.showCancelButton = false;
    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
  ngOnInit(): void {
  }

}
