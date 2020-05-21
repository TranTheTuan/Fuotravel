import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {User} from '../../models';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Input() planId;
  @ViewChild(FormGroupDirective) postFormDirective;
  previews = [];
  currentUser: User;
  postForm = this.fb.group({
    caption: ['', [Validators.required]],
    images: ['']
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onSubmit(formValue: any) {
    this.postService.addPost(this.planId, formValue);
    this.previews = null;
  }

  onFileChange(event) {
    const files = event.target.files;
    this.postForm.patchValue({
      images: files
    });
    this.previews.splice(0, this.previews.length);
    // this.createPlanForm.get('cover').updateValueAndValidity();
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previews.push(reader.result as string);
      };
    }
  }

}
