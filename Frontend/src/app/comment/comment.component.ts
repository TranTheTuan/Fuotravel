import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../models/comment';
import {CommentService} from '../services/comment.service';
import {ActivatedRoute} from '@angular/router';
import {COMMENT, DOWN, PLAN, POST, UP} from '../helpers';
import {VoteService} from '../services/vote.service';
import {FormBuilder, Validators} from '@angular/forms';
import {switchMap, tap} from 'rxjs/operators';
import {WebSocketService} from '../services/web-socket.service';
import {AuthService} from '../services/auth.service';
import {User} from '../models';

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
  currentUser: User;

  constructor(
    private commentService: CommentService,
    private voteService: VoteService,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    const currentPath = this.route.snapshot.url[0].path;
    if (currentPath === 'discuss') {
      this.commentableType = PLAN;
    }
    this.getAll();
    this.socketInteraction();
  }

  getAll() {
    let commentListener = this.commentService.getAll(this.commentableId, this.commentableType);
    if (this.commentableType === PLAN) {
      commentListener = this.route.parent.paramMap.pipe(
        tap((params) => this.commentableId = params.get('plan_id')),
        switchMap(() => this.commentService.getAll(this.commentableId, this.commentableType))
      );
    }
    commentListener.subscribe(res => {
      this.comments = res.data;
    });
  }
  socketInteraction() {
    this.webSocketService.listen('send-comment').subscribe(res => {
      console.log(res);
      const newComment: Comment = res.comment;
      console.log(this.currentUser.name);
      if (this.currentUser.id === newComment.author.id) {
        const newRoom = 'comment_room_' + newComment.id ;
        this.webSocketService.emit('new-room', newRoom);
      } else {
        if (this.commentableType === POST) {
          if (this.commentableId === +res.commentPostId) {
            this.newCommentAction(res, newComment);
          }
        } else {
          this.newCommentAction(res, newComment);
        }
      }
    });
  }

  newCommentAction(res: any, newComment: Comment) {
    if (res.isReply) {
      this.addReply(newComment);
    } else {
      this.addComment(newComment);
    }
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
    console.log(this.comments);
    const comment = this.comments.find(acomment => acomment.id === +newReply.parent_id);
    comment.replies.push(newReply);
  }
}
