import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private APIS = {
    1: environment.apiURL + '/posts/{plan_id}',
    2: environment.apiURL + '/posts/create/{plan_id}'
  };
  private posts: Post[] = [];
  private posts$ = new Subject<Post[]>();
  constructor(private http: HttpClient) { }
  getPosts(planId: any) {
    const apiUrl = this.APIS[1].replace('{plan_id}', planId);
    this.http.get<ApiResponse>(apiUrl).subscribe(res => {
      this.posts = res.data;
      this.posts$.next([...this.posts]);
    });
  }
  getPostsListener() {
    return this.posts$.asObservable();
  }
  addPost(planId: any, formValue: any) {
    const apiUrl = this.APIS[2].replace('{plan_id}', planId);
    this.http.post<ApiResponse>(apiUrl, toFormData(formValue)).subscribe(res => {
      const post: Post = res.data;
      console.log(post);
      this.posts.unshift(post);
      this.posts$.next([...this.posts]);
    });
  }
}
