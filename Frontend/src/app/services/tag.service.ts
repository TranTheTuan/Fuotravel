import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public APIS = {
    1: environment.apiURL + '/tags',
    2: environment.apiURL + '/tags/add/{taggable_id}/taggable/{taggable}',
    3: environment.apiURL + '/tags/{taggable_id}/taggable/{taggable}',
    4: environment.apiURL + '/detach/{taggable_id}/taggable/{taggble}'
  };
  constructor(private http: HttpClient) { }
  public getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[1])
      .pipe(map(res => {
        if (res.data) {
          localStorage.setItem('tags', res.data);
        }
        return res;
      }
      ));
  }
  public addTags(taggableId: any, taggable: any, params): Observable<ApiResponse> {
    let apiURL = this.APIS[2].replace('{taggable_id}', taggableId);
    apiURL = apiURL.replace('{taggable}', taggable);
    return this.http.post<ApiResponse>(apiURL, params)
      .pipe(map(res => {
        return res;
      }));
  }
}
