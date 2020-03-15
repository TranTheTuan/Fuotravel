import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private APIS = {
    1: environment.apiURL + '/posts/{postable_id}/postable/{postable}',
    2: environment.apiURL + '/posts/create/{postable_id}/postable/{postable}'
  };
  constructor(private http: HttpClient) { }
  getAll(postableId: any, postable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{postable_id}', postableId)
      .replace('{postable}', postable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        if (res.data.length > 0) {
          localStorage.setItem('posts', JSON.stringify(res.data));
        }
        return res;
      }));
  }
  createPost(postableId: any, postable: any, formValue: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{postable_id}', postableId)
      .replace('{postable}', postable);
    return this.http.post<ApiResponse>(apiUrl, toFormData(formValue))
      .pipe(map(res => {
        return res;
      }));
  }
}
