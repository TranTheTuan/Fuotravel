import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Tag, User} from '../../../../utility/models';
import {TagService} from '../../../../utility/services/tag.service';
import {TAG_USER} from '../../../../utility/helpers';
import {MatSnackBar} from '@angular/material/snack-bar';
import {formatDate} from '@angular/common';
import {dateFormat} from '../../../../utility/helpers/date-format';
import {UserService} from '../../../../utility/services/user.service';

@Component({
  selector: 'app-user-update-profile-dialog',
  templateUrl: './user-update-profile-dialog.component.html',
  styleUrls: ['./user-update-profile-dialog.component.css']
})
export class UserUpdateProfileDialogComponent implements OnInit {
  readonly TAG_USER = TAG_USER;
  tags: Tag[];
  userId;
  updateProfileForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', [Validators.required]],
    birthday: [''],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
  });
  tagForm = this.fb.group({
    tags: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserUpdateProfileDialogComponent>,
    private tagService: TagService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  }

  ngOnInit(): void {
    this.userId = this.data.id;
    this.updateProfileForm.patchValue({
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      gender: this.data.gender,
      birthday: this.data.birthday,
      phone: this.data.phone
    });
    this.getTags();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpdateProfileSubmit() {
    const formValue = this.updateProfileForm.value;
    formValue.birthday = dateFormat(formValue.birthday, true);
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      formData.append(key, formValue[key]);
    }
    formData.append('_method', 'PUT');
    this.userService.updateProfile(formData, this.userId).subscribe(() => {
      this.dialogRef.close(formValue);
      this.snackBar.open('Updated user profile', 'Close', {duration: 3000});
    }, error => {
      console.log(error);
      this.dialogRef.close();
    });
  }

  onUpdateTags(selectedTags: any) {
    this.dialogRef.close(selectedTags);
  }

  setCheckedStatus(tagId: any) {
    const index = this.data.tags.findIndex(tag => tag.id === tagId);
    return index !== -1;
  }

  getTags() {
    this.tagService.getAll().subscribe(res => {
      this.tags = res.data;
      this.tagForm = this.fb.group({
        tags: this.buildTagsArray(this.tags)
      });
    }, error => console.table(error.error.message));
  }

  get tagsArray() {
    return this.tagForm.get('tags') as FormArray;
  }

  buildTagsArray(tags: Tag[]) {
    const tagsArr = tags.map(tag => {
      return this.fb.control(this.setCheckedStatus(tag.id));
    });
    return this.fb.array(tagsArr);
  }

}
