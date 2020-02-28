import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {catchError, map} from 'rxjs/operators';
import {toFormData} from "../helpers/toFormData";

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private APIS = {
    1: environment.apiURL + '/plans',
    2: environment.apiURL + '/plans/{plan_id}',
    3: environment.apiURL + '/plans/create'
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
}
