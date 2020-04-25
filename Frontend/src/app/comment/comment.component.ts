import {Component, Input, OnInit} from '@angular/core';
import { Comment } from '../models/comment';
import {CommentService} from '../services/comment.service';
import {ActivatedRoute} from '@angular/router';
import {COMMENT, DOWN, PLAN, POST, UP} from '../helpers';
import {VoteService} from '../services/vote.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() commentableId;
  @Input() commentableType;
  _COMMENT = COMMENT;
  _UP = UP;
  _DOWN = DOWN;
  comments: Comment[];
  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const currentPath = this.route.snapshot.url[0].path;
    if (currentPath === 'discuss') {
      this.commentableId = this.route.parent.snapshot.paramMap.get('plan_id');
      this.commentableType = PLAN;
    }
    this.getAll(this.commentableId, this.commentableType);
  }
  getAll(commentableId: any, commentable: any) {
    this.commentService.getAll(commentableId, commentable)
      .subscribe(res => {
        this.comments = res.data;
      });
  }
  vote(voteableId: any, voteable: any, voteType: any) {
    this.voteService.vote(voteableId, voteable, voteType)
      .subscribe(res => {
        const comment = this.comments.find(acomment => acomment.id === voteableId);
        if (!comment) {
          this.comments.forEach(cmt => {
            const reply: Comment = cmt.replies.find(areply => areply.id === voteableId);
            if (reply) {
              reply.vote = res.data;
              return;
            }
          });
        } else {
          comment.vote = res.data;
        }
      }, error => console.log(error.error));
  }
  addComment(newComment: Comment) {
    this.comments.unshift(newComment);
  }
  addReply(newReply: Comment) {
    const comment = this.comments.find(acomment => acomment.id === newReply.parent_id);
    comment.replies.unshift(newReply);
  }
}
