import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private APIS = {
    1: environment.apiURL + '/posts/{postable_id}/postable/{postable}'
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
}
