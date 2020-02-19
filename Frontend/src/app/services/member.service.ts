import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {MEMBER, PENDING} from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private APIS = {
    1: environment.apiURL + '/members/requesters/{memberable_id}/memberable/{memberable}',
    2: environment.apiURL + '/members/joined/{memberable_id}/memberable/{memberable}',
    3: environment.apiURL + '/members/admin/accept/{user_id}/{memberable_id}/memberable/{memberable}',
  };
  constructor(private http: HttpClient) { }
  getMembers(memberableId: any, memberable: any, memberType: number): Observable<ApiResponse> {
    let apiUrl = '';
    if (memberType === PENDING) {
      apiUrl = this.APIS[1];
    } else {
      apiUrl = this.APIS[2];
    }
    apiUrl = apiUrl.replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        return res;
      }));
  }
  accept(userId: any, memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[3].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
}
