import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag, User} from '../../models';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {TAG_USER} from '../../helpers';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  public tags: Tag[];
  public tagForm: FormGroup;
  currentUser: User;
  constructor(
    private tagService: TagService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }
  public getTags() {
    this.tagService.getAll().subscribe(res => {
      this.tags = res.data;
    }, error => console.table(error.error.message));
  }
  onChangeEvent(id: number, event) {
    const tagIds = (this.tagForm.controls.tags as FormArray);
    if (event.checked) {
      tagIds.push(new FormControl(id));
    } else {
      const index = tagIds.controls.findIndex(x => x.value === id);
      tagIds.removeAt(index);
    }
  }
  onSubmit() {
    this.currentUser = this.authService.currentUserValue;
    this.tagService.updateTags(this.currentUser.id, TAG_USER, this.tagForm.value).subscribe(
      res => {
        this.currentUser.tags = res.data;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate(['home']);
      }, error => console.log(error.error)
    );
  }
  ngOnInit(): void {
    this.getTags();
    this.tagForm = this.fb.group({
      tags: this.fb.array([])
    });
  }

}
