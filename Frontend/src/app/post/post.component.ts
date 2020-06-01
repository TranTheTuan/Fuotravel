import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute} from '@angular/router';
import {DOWN, GROUP, PLAN, POST, UP} from '../helpers';
import {VoteService} from '../services/vote.service';
import {NgImageSliderComponent} from 'ng-image-slider';
import {WebSocketService} from '../services/web-socket.service';
import {User} from '../models';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  planId = null;
  public readonly _POST = POST;
  public readonly _UP = UP;
  public readonly _DOWN = DOWN;
  public posts: Post[];
  currentUser: User;

  constructor(
    private postService: PostService,
    private voteService: VoteService,
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.postService.getPosts(this.planId);
    this.postService.getPostsListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.socketInteraction();
  }

  socketInteraction() {
    this.webSocketService.listen('send-post').subscribe(post => {
      const newPost: Post = post;
      console.log(newPost);
      if (this.currentUser.id === newPost.author.id) {
        const newRoom = 'post_room_' + newPost.id;
        this.webSocketService.emit('new-room', newRoom);
      } else {
        this.posts.unshift(newPost);
      }
    });
  }

  vote(voteableId: any, voteable: any, voteType: any) {
    this.voteService.vote(voteableId, voteable, voteType)
      .subscribe(res => {
        const post = this.posts.find(apost => apost.id === voteableId);
        post.vote = res.data;
      }, error => console.log(error.error));
  }
}
