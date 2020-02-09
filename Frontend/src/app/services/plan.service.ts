import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private APIS = {
    1: environment.apiURL + '/plans',
    2: environment.apiURL + '/plans/{plan_id}'
  };
  constructor(private http: HttpClient) { }
  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[1])
        .pipe(map(res => {
          if (res.data) {
            console.log(res.data);
            localStorage.setItem('plans', JSON.stringify(res.data));
          }
          return res;
        }));
  }
}
