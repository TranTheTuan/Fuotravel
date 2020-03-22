import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private APIS = {
    1: environment.apiURL + '/comments/{commentable_id}/commentable/{commentable}',
    2: environment.apiURL + '/comments/create/{commentable_id}/commentable/{commentable}'
  };
  private comments: Comment[];
  private comments$ = new Subject<Comment[]>();
  constructor(private http: HttpClient) { }
  getAll(commentableId: any, commentable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        return res;
      }));
  }
  getComments(commentableId: any, commentable: any) {
    const apiUrl = this.APIS[1].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    return this.http.get<ApiResponse>(apiUrl).subscribe(res => {
      if (res.data) {
        this.comments = res.data;
        this.comments$.next([...this.comments]);
      }
    });
  }
  getCommentsListener() {
    return this.comments$.asObservable();
  }
  createComment(commentableId: any, commentable: any, formValue: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    return this.http.post<ApiResponse>(apiUrl, toFormData(formValue))
      .pipe(map(res => {
        return res;
      }));
  }
  addComment(commentableId: any, commentable: any, formValue: any) {
    const apiUrl = this.APIS[2].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    return this.http.post<ApiResponse>(apiUrl, toFormData(formValue))
      .subscribe(res => {
        if (res.data.parent_id) {
          const updatedComments = [...this.comments];
          const commentIndex = updatedComments.findIndex(comment => comment.id === +res.data.parent_id);
          updatedComments[commentIndex].replies.push(res.data);
          this.comments = updatedComments;
        } else {
          this.comments.unshift(res.data);
        }
        this.comments$.next([...this.comments]);
      });
  }
}
