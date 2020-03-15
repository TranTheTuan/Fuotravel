import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../models/comment';
import {COMMENT, DOWN, PLAN, UP} from '../../helpers';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {CommentService} from '../../services/comment.service';
import {VoteService} from '../../services/vote.service';
import {ActivatedRoute} from '@angular/router';
import {toFormData} from '../../helpers/toFormData';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() commentable;
  @Input() postId;
  @Output() newCommentEvent = new EventEmitter<Comment>();
  @ViewChild(FormGroupDirective) commentFormDirective;
  preview = null;
  comments: Comment[];
  commentForm = this.fb.group({
    content: ['', [Validators.required]],
    images: ['']
  });
  formData = new FormData();
  commentableId;
  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.commentable === PLAN) {
      this.commentableId = this.route.parent.snapshot.paramMap.get('plan_id');
    } else {
      this.commentableId = this.postId;
    }
  }
  onSubmit(formValue: any) {
    this.commentService.createComment(this.commentableId, this.commentable, formValue)
      .subscribe(res => {
        const newComment: Comment = res.data;
        this.newCommentEvent.emit(newComment);
        if (this.commentFormDirective) {
          this.commentFormDirective.resetForm();
        }
      });
  }
  onFileChange(event) {
    const files = event.target.files;
    this.commentForm.patchValue({
      images: files
    });
    // this.commentForm.get('cover').updateValueAndValidity();
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.preview = reader.result as string;
    // };
  }
}
