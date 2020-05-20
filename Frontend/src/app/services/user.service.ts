import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private APIS = {
    1: environment.apiURL + '/users/{user_id}/avatar',
    2: environment.apiURL + '/users/{user_id}',
  };
  constructor(
    private http: HttpClient
  ) { }
  updateAvatar(formData: any, userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{user_id}', userId);
    return this.http.post<ApiResponse>(apiUrl, formData);
  }
  updateProfile(formData: any, userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{user_id}', userId);
    return this.http.post<ApiResponse>(apiUrl, formData);
  }
  getUserDetail(userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{user_id}', userId);
    return this.http.get<ApiResponse>(apiUrl);
  }
}
