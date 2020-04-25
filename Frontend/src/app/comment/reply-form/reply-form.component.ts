import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../models/comment';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {PLAN} from '../../helpers';
import {CommentService} from '../../services/comment.service';
import {VoteService} from '../../services/vote.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models';
import {AuthService} from '../../services';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  @Input() parentId;
  @Input() commentableType;
  @Input() commentableId;
  @Output() newReplyEvent = new EventEmitter<Comment>();
  @ViewChild(FormGroupDirective) replyFormDirective;
  @ViewChild('replyInput') replyInput: ElementRef;
  preview = null;
  comments: Comment[];
  currentUser: User;
  replyForm = this.fb.group({
    content: ['', [Validators.required]],
    image: [''],
    parent_id: ['']
  });
  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.replyForm.patchValue({
      parent_id: this.parentId
    });
  }
  onSubmit(formValue: any) {
    this.commentService.createComment(this.commentableId, this.commentableType, formValue)
      .subscribe(res => {
        const newComment: Comment = res.data;
        newComment.parent_id = +res.data.parent_id;
        this.newReplyEvent.emit(newComment);
        if (this.replyFormDirective) {
          this.replyFormDirective.resetForm();
          this.replyForm.patchValue({
            parent_id: this.parentId
          });
          this.replyInput.nativeElement.value = '';
        }
      });
    // this.commentService.addComment(this.commentableId, this.commentableType, formValue);
    // this.replyFormDirective.resetForm();
    // this.replyForm.patchValue({
    //   parent_id: this.parentId
    // });
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
