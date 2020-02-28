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
    4: environment.apiURL + '/members/decline/{user_id}/{memberable_id}/memberable/{memberable}',
    5: environment.apiURL + '/members/admin/ban/{user_id}/{memberable_id}/memberable/{memberable}',
    6: environment.apiURL + '/members/admin/kick/{user_id}/{memberable_id}/memberable/{memberable}',
    7: environment.apiURL + '/members/admin/promote/{user_id}/{memberable_id}/memberable/{memberable}/{role}',
    8: environment.apiURL + '/members/admin/discharge/{user_id}/{memberable_id}/memberable/{memberable}/{role}',
    9: environment.apiURL + '/members/join/{memberable_id}/memberable/{memberable}',
    10: environment.apiURL + '/members/unfollow/{memberable_id}/memberable/{memberable}',
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
  decline(userId: any, memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[4].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  ban(userId: any, memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[5].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  kick(userId: any, memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[6].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  promote(userId: any, memberableId: any, memberable: any, role: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[7].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable)
      .replace('{role}', role);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  discharge(userId: any, memberableId: any, memberable: any, role: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[8].replace('{user_id}', userId)
      .replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable)
      .replace('{role}', role);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  join(memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[9].replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  cancel(memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[9].replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  unfollow(memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[9].replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
  leave(memberableId: any, memberable: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[9].replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
}
