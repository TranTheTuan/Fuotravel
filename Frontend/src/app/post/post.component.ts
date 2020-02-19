import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {ActivatedRoute} from '@angular/router';
import {PLAN} from '../helpers';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public planId;
  public posts: Post[];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.planId = this.route.parent.snapshot.paramMap.get('plan_id');
    this.postService.getAll(this.planId, PLAN).subscribe(res => {
      this.posts = res.data;
      console.log(this.posts);
    }, error => console.log(error.error.message));
  }

}
