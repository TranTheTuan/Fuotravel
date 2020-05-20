import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private APIS = {
    1: environment.apiURL + '/users/friendships/{user_id}',
    2: environment.apiURL + '/users/friendships/requests/sent',
    3: environment.apiURL + '/users/friendships/requests/received',
    4: environment.apiURL + '/users/friendships/requests/send/{recipient_id}',
    5: environment.apiURL + '/users/friendships/requests/accept/{sender_id}',
    6: environment.apiURL + '/users/friendships/requests/decline/{sender_id}',
    7: environment.apiURL + '/users/friendships/requests/cancel/{recipient_id}',
    8: environment.apiURL + '/users/friendships/unfriend/{target_id}',
  };
  constructor(
    private http: HttpClient
  ) { }
  getFriends(userid: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{user_id}', userid);
    return this.http.get<ApiResponse>(apiUrl);
  }
  getSentRequests(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[2]);
  }
  getReceivedRequests(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[3]);
  }
  sendRequest(recipientId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[4].replace('{recipient_id}', recipientId);
    return this.http.post<ApiResponse>(apiUrl, null);
  }
  acceptRequest(senderId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[5].replace('{sender_id}', senderId);
    return this.http.put<ApiResponse>(apiUrl, null);
  }
  declineRequest(senderId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[6].replace('{sender_id}', senderId);
    return this.http.delete<ApiResponse>(apiUrl);
  }
  cancelRequest(recipientId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[7].replace('{recipient_id}', recipientId);
    return this.http.delete<ApiResponse>(apiUrl);
  }
  unfriend(targetId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[8].replace('{target_id}', targetId);
    return this.http.delete<ApiResponse>(apiUrl);
  }
}
