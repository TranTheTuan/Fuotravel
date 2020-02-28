import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute} from '@angular/router';
import {DOWN, PLAN, POST, UP} from '../helpers';
import {VoteService} from '../services/vote.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public readonly _POST = POST;
  public readonly _UP = UP;
  public readonly _DOWN = DOWN;
  public planId;
  public posts: Post[];
  constructor(
    private postService: PostService,
    private voteService: VoteService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.postService.getAll(this.planId, PLAN).subscribe(res => {
      this.posts = res.data;
    }, error => console.log(error.error.message));
  }
  vote(voteableId: any, voteable: any, voteType: any) {
    this.voteService.vote(voteableId, voteable, voteType)
      .subscribe(res => {
        const post = this.posts.find(apost => apost.id === voteableId);
        post.vote = res.data;
      }, error => console.log(error.error));
  }
}
