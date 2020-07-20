import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
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
    2: environment.apiURL + '/users/notifications/{notification_id}/mark-as-read',
    3: environment.apiURL + '/users/notifications/{notification_id}/mark-as-unread',
    4: environment.apiURL + '/users/notifications/{notification_id}/mark-all-as-read'
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
    this.unreadSubject.next(--this.unread);
    const updatedNotifications = [...this.notifications];
    const notifyIndex = updatedNotifications.findIndex(notify => notify.id === notificationId);
    updatedNotifications[notifyIndex].readAt = (new Date()).toDateString();
    this.notifications = updatedNotifications;
    this.notificationSubject.next([...this.notifications]);
    return this.http.put<ApiResponse>(apiUrl, null).subscribe();
  }

  markAsUnread(notificationId: any) {
    const apiUrl = this.APIS[3].replace('{notification_id}', notificationId);
    this.unreadSubject.next(++this.unread);
    const updatedNotifications = [...this.notifications];
    const notifyIndex = updatedNotifications.findIndex(notify => notify.id === notificationId);
    updatedNotifications[notifyIndex].readAt = null;
    this.notifications = updatedNotifications;
    this.notificationSubject.next([...this.notifications]);
    return this.http.put<ApiResponse>(apiUrl, null).subscribe();
  }

  markAllAsRead() {
    const apiUrl = this.APIS[4];
    this.unreadSubject.next(this.unread = 0);
    const updatedNotifications = [...this.notifications];
    updatedNotifications.forEach(notification => notification.readAt = (new Date()).toDateString());
    this.notifications = updatedNotifications;
    this.notificationSubject.next([...this.notifications]);
    return this.http.put<ApiResponse>(apiUrl, null).subscribe();
  }
}
