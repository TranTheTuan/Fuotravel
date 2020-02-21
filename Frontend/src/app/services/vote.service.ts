import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {UP} from '../helpers';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private APIS = {
    1: environment.apiURL + '/votes/upvote/{voteable_id}/voteable/{voteable}',
    2: environment.apiURL + '/votes/downvote/{voteable_id}/voteable/{voteable}',
  };
  constructor(private http: HttpClient) { }
  vote(voteableId: any, voteable: any, voteType: any): Observable<ApiResponse> {
    let apiUrl = '';
    if (voteType === UP) {
      apiUrl = this.APIS[1];
    } else {
      apiUrl = this.APIS[2];
    }
    apiUrl = apiUrl.replace('{voteable_id}', voteableId)
      .replace('{voteable}', voteable);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }
}
