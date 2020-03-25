import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiResponse, Plan} from '../models';
import {catchError, map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private APIS = {
    1: environment.apiURL + '/plans',
    2: environment.apiURL + '/plans/{plan_id}',
    3: environment.apiURL + '/plans/create',
    4: environment.apiURL + '/plans/update/{plan_id}'
  };
  constructor(private http: HttpClient) { }
  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[1])
        .pipe(map(res => {
          if (res.data) {
            localStorage.setItem('plans', JSON.stringify(res.data));
          }
          return res;
        }));
  }
  getDetail(planId: any): Observable<ApiResponse> {
    const apiURL = this.APIS[2].replace('{plan_id}', planId);
    return this.http.get<ApiResponse>(apiURL)
      .pipe(map(res => {
        return res;
      }));
  }
  createPlan(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[3], toFormData(data))
      .pipe(map(res => {
        return res;
      }));
  }
  updatePlan(data: any, planId): Observable<ApiResponse> {
    const apiURL = this.APIS[4].replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiURL, toFormData(data))
      .pipe(map(res => {
        return res;
      }));
  }
}
