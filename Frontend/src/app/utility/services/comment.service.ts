import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';
import {Comment} from '../models/comment';
import {Cacheable} from 'ngx-cacheable';

const cacheBuster$ = new Subject();

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private APIS = {
    1: environment.apiURL + '/comments/{commentable_id}/commentable/{commentable}',
    2: environment.apiURL + '/comments/create/{commentable_id}/commentable/{commentable}'
  };

  constructor(private http: HttpClient) {
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(commentableId: any, commentable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        return res;
      }));
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  createComment(commentableId: any, commentable: any, formValue: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{commentable_id}', commentableId)
      .replace('{commentable}', commentable);
    console.log(toFormData(formValue).getAll('image'));
    return this.http.post<ApiResponse>(apiUrl, toFormData(formValue))
      .pipe(map(res => {
        cacheBuster$.next();
        return res;
      }));
  }
}
