import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {Notify} from '../models/notify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private APIS = {
    1: environment.apiURL + '/users/notifications',
    2: environment.apiURL + '/users/notifications/{notification_id}/mark-as-read'
  };
  notifications: Notify[] = [];
  unread = 0;
  private notificationSubject = new BehaviorSubject<Notify[]>([...this.notifications]);
  private unreadSubject = new BehaviorSubject<number>(this.unread);
  notificationListener = this.notificationSubject.asObservable();
  unreadListener = this.unreadSubject.asObservable();
  constructor(
    private http: HttpClient
  ) {
  }

  getAllNotifications() {
    return this.http.get<ApiResponse>(this.APIS[1]).subscribe(res => {
      this.notifications = res.data;
      this.unread = this.notifications.filter(notify => notify.readAt == null).length;
      this.unreadSubject.next(this.unread);
      this.notificationSubject.next(res.data);
    });
  }

  setUnread() {
    this.unreadSubject.next(++this.unread);
  }

  markAsRead(notificationId: any) {
    const apiUrl = this.APIS[2].replace('{notification_id}', notificationId);
    return this.http.put<ApiResponse>(apiUrl, null).subscribe(res => {
      const updatedNotifications = [...this.notifications];
      const notifyIndex = updatedNotifications.findIndex(notify => notify.id === notificationId);
      updatedNotifications[notifyIndex].readAt = (new Date()).toDateString();
      this.notifications = updatedNotifications;
      this.unreadSubject.next(--this.unread);
      this.notificationSubject.next([...this.notifications]);
    });
  }
}
