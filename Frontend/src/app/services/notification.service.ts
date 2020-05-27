import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private APIS = {
    1: environment.apiURL + '/users/notifications',
    2: environment.apiURL + '/users/notifications/{notification_id}/mark-as-read'
  };

  constructor(
    private http: HttpClient
  ) {
  }

  getAllNotifications(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[1]);
  }

  markAsRead(notificationId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{notification_id}', notificationId);
    return this.http.put<ApiResponse>(apiUrl, null);
  }
}
