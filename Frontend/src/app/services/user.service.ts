import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiResponse} from '../models';
import {Cacheable} from 'ngx-cacheable';

const cacheBuster$ = new Subject<void>();

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
  ) {
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  updateAvatar(formData: any, userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[1].replace('{user_id}', userId);
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(res => {
      cacheBuster$.next();
      return res;
    });
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  updateProfile(formData: any, userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{user_id}', userId);
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(res => {
      cacheBuster$.next();
      return res;
    });
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getUserDetail(userId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[2].replace('{user_id}', userId);
    return this.http.get<ApiResponse>(apiUrl);
  }
}
