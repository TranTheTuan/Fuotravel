import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ApiResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIS = {
    1: environment.apiURL + '/login',
    2: environment.apiURL + '/register'
  };
  private currentUserSubject: BehaviorSubject<User>;
  readonly currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }
  public login(params: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[1], params)
      .pipe(map(res => {
          if (res.data) {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.currentUserSubject.next(res.data);
          }
          return res;
        }));
  }
  public register(params: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[2], params)
      .pipe(map(res => {
        if (res.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
        return res;
      }));
  }
  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
