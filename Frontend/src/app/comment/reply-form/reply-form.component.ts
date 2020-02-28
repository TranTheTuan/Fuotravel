import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../models/comment';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {PLAN} from '../../helpers';
import {CommentService} from '../../services/comment.service';
import {VoteService} from '../../services/vote.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  @Input() parentId;
  @Input() postId;
  @Input() commentable;
  @Output() newReplyEvent = new EventEmitter<Comment>();
  @ViewChild(FormGroupDirective) replyFormDirective;
  preview = null;
  comments: Comment[];
  commentableId;
  replyForm = this.fb.group({
    content: ['', [Validators.required]],
    image: [null],
    parent_id: ['']
  });
  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.replyForm.patchValue({
      parent_id: this.parentId
    });
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
        // tslint:disable-next-line:radix
        newComment.parent_id = parseInt(res.data.parent_id);
        this.newReplyEvent.emit(newComment);
        this.replyForm.patchValue({
          content: ''
        });
      });
  }
  onFileChange(event) {
    const file: File = event.target.files[0];
    this.replyForm.patchValue({
      image: file
    });
    // this.createPlanForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }
}
