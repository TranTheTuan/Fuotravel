import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import {ApiResponse, User} from '../models';
import {toFormData} from '../helpers/toFormData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIS = {
    1: environment.apiURL + '/login',
    2: environment.apiURL + '/register',
    3: environment.apiURL + '/login/provider/{provider}',
  };
  private currentUserSubject: BehaviorSubject<any>;
  readonly currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue() {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }

  login(params: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[1], params)
      .pipe(map(res => {
        if (res.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.currentUserSubject.next(res.data);
        }
        return res;
      }));
  }

  updateUserRooms(roomType: string, roomId: number) {
    const currentUser = this.currentUserValue;
    currentUser.roomData[roomType].push(roomId);
    console.log(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  removeUserRooms(roomType: string, roomId: number) {
    const currentUser = this.currentUserValue;
    const roomIndex = currentUser.roomData[roomType].findIndex(room => room === roomId);
    currentUser.roomData[roomType].splice(roomIndex, 1);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  loginWithProvider(provider: string): Observable<any> {
    const apiUrl = this.APIS[3].replace('{provider}', provider);
    return this.http.get<any>(apiUrl);
  }

  register(params: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[2], toFormData(params))
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
