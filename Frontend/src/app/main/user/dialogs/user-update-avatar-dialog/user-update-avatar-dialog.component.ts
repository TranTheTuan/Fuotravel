import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from '../../../../models';

@Component({
  selector: 'app-user-update-avatar-dialog',
  templateUrl: './user-update-avatar-dialog.component.html',
  styleUrls: ['./user-update-avatar-dialog.component.css']
})
export class UserUpdateAvatarDialogComponent implements OnInit {
  preview;
  avatarData = new FormData();

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UserUpdateAvatarDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileChange(e) {
    const avatar = e.target.files[0];
    this.avatarData.append('avatar', avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }

  onSave() {
    this.avatarData.append('_method', 'put');
    this.userService.updateAvatar(this.avatarData, this.data.id).subscribe(res => {
      this.data.avatar = res.data;
      localStorage.setItem('currentUser', JSON.stringify(this.data));
      this.dialogRef.close(this.preview);
      this.snackBar.open('Update avatar successfully', 'Close', {duration: 3000});
    }, error => console.log(error));
  }
}
