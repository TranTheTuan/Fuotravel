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
    2: environment.apiURL + '/members/joined/{memberable_id}/memberable/{memberable}'
  };
  constructor(private http: HttpClient) { }
  getMembers(memberableId: any, memberable: any, memberType: number): Observable<ApiResponse> {
    let apiUrl = '';
    let localStorageItem = '';
    if (memberType === PENDING) {
      apiUrl = this.APIS[1];
      localStorageItem = 'planRequesters';
    } else {
      apiUrl = this.APIS[2];
      localStorageItem = 'planMembers';
    }
    apiUrl = apiUrl.replace('{memberable_id}', memberableId)
      .replace('{memberable}', memberable);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        if (res.data.length > 0) {
          localStorage.setItem(localStorageItem, JSON.stringify(res.data));
        }
        return res;
      }));
  }
}
