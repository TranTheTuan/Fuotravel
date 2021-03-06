import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../../utility/models/comment';
import {COMMENT, DOWN, PLAN, UP} from '../../../utility/helpers';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {CommentService} from '../../../utility/services/comment.service';
import {VoteService} from '../../../utility/services/vote.service';
import {ActivatedRoute} from '@angular/router';
import {toFormData} from '../../../utility/helpers/toFormData';
import {User} from '../../../utility/models';
import {AuthService} from '../../../utility/services/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() commentableId;
  @Input() commentableType;
  @Output() newCommentEvent = new EventEmitter<Comment>();
  @ViewChild(FormGroupDirective) commentFormDirective;
  @ViewChild('imageInput') imageInput: ElementRef;
  preview = null;
  comments: Comment[];
  currentUser: User;
  commentForm = this.fb.group({
    content: [''],
    image: ['']
  });

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onSubmit() {
    if (!this.authService.checkAuth()) {
      return;
    }
    const formValue = this.commentForm.value;
    if (!formValue.content) {
      return;
    }
    if (!formValue.image) {
      delete formValue.image;
    }
    this.commentService.createComment(this.commentableId, this.commentableType, formValue)
      .subscribe(res => {
        const newComment: Comment = res.data;
        this.newCommentEvent.emit(newComment);
        if (this.commentFormDirective) {
          this.commentFormDirective.resetForm();
          this.imageInput.nativeElement.value = null;
          this.preview = null;
        }
      });
    // this.commentService.addComment(this.commentableId, this.commentableType, formValue);
    // this.commentFormDirective.resetForm();
    // this.imageInput.nativeElement.value = '';
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.commentForm.patchValue({
      image: file
    });
    // this.commentForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }
}
