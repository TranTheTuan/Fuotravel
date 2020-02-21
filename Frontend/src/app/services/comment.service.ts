import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private APIS = {
    1: environment.apiURL + '/comments/{commentable_id}/commentable/{commentable}'
  };
  constructor(private http: HttpClient) { }
  getAll(commentableid: any, commentable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{commentable_id}', commentableid)
      .replace('{commentable}', commentable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        return res;
      }));
  }
}
