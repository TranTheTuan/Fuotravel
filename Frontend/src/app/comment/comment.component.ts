import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import {CommentService} from '../services/comment.service';
import {ActivatedRoute} from '@angular/router';
import {PLAN} from '../helpers';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public planId;
  public comments: Comment[];
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.getAll(this.planId, PLAN);
  }
  getAll(commentableId: any, commentable: any) {
    this.commentService.getAll(commentableId, commentable)
      .subscribe(res => {
        this.comments = res.data;
      });
  }
}
