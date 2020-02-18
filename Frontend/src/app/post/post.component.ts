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
  public posts: Post[];
  constructor(
    private postService: PostService,
    private router: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('plan_id');
    this.postService.getAll(id, PLAN).subscribe(res => {
      this.posts = res.data;
    }, error => console.log(error.error.message));
  }

}
