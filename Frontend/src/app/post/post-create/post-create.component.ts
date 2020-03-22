import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Comment} from '../../models/comment';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Input() planId;
  @ViewChild(FormGroupDirective) postFormDirective;
  preview;
  postForm = this.fb.group({
    caption: ['', [Validators.required]],
    images: ['']
  });
  constructor(private fb: FormBuilder,
              private postService: PostService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(formValue: any) {
    this.postService.addPost(this.planId, formValue);
  }
  onFileChange(event) {
    const files = event.target.files;
    this.postForm.patchValue({
      images: files
    });
    // this.createPlanForm.get('cover').updateValueAndValidity();
  }

}
