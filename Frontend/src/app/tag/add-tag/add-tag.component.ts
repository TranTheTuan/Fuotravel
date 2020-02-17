import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

const USER = 1;
const PLAN = 2;
const GROUP = 3;
const POST = 4;

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  public tags: Tag[];
  public tagForm: FormGroup;
  constructor(
    private tagService: TagService,
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
    const userId = JSON.parse(localStorage.getItem('currentUser')).token.user_id;
    this.tagService.addTags(userId, USER, this.tagForm.value).subscribe(
      res => {
        console.log(res.data);
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
