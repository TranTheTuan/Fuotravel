import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ApiResponse, Plan} from '../models';
import {catchError, map} from 'rxjs/operators';
import {toFormData} from '../helpers/toFormData';
import {Waypoint} from '../helpers/waypoint';
import {Cacheable} from 'ngx-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private APIS = {
    1: environment.apiURL + '/plans',
    2: environment.apiURL + '/plans/{plan_id}',
    3: environment.apiURL + '/plans/create',
    4: environment.apiURL + '/plans/update/{plan_id}',
    5: environment.apiURL + '/plans/{plan_id}/waypoints',
    6: environment.apiURL + '/plans/members-status',
    7: environment.apiURL + '/plans/{plan_id}/invitable-friends',
    8: environment.apiURL + '/plans/{plan_id}/invite-friends'
  };
  private waypoints: Waypoint[] = [];
  private waypointsBehavior = new BehaviorSubject<Waypoint[]>(this.waypoints);
  waypointsListener = this.waypointsBehavior.asObservable();

  constructor(private http: HttpClient) {
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(query: string = '', tags: string = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[1], {
      params: new HttpParams()
        .set('query', query)
        .set('tags', tags)
    });
  }

  getInvitableFriends(planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[7].replace('{plan_id}', planId);
    return this.http.get<ApiResponse>(apiUrl);
  }

  inviteFriends(planId: any, formData: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[8].replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, formData);
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getDetail(planId: any): Observable<ApiResponse> {
    const apiURL = this.APIS[2].replace('{plan_id}', planId);
    return this.http.get<ApiResponse>(apiURL)
      .pipe(map(res => {
        return res;
      }));
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  createPlan(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIS[3], toFormData(data))
      .pipe(map(res => {
        cacheBuster$.next();
        return res;
      }));
  }

  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  updatePlan(data: any, planId): Observable<ApiResponse> {
    const apiURL = this.APIS[4].replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiURL, toFormData(data))
      .pipe(map(res => {
        cacheBuster$.next();
        return res;
      }));
  }

  updateWaypoints(data: any, planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[5].replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, data);
  }

  getWaypoints(planId: any) {
    const apiUrl = this.APIS[5].replace('{plan_id}', planId);
    return this.http.get<ApiResponse>(apiUrl).subscribe(res => {
      this.waypoints = res.data;
      this.waypointsBehavior.next([...this.waypoints]);
    });
  }

  setWaypoints(updatedWaypoints: Waypoint[]) {
    this.waypoints = updatedWaypoints;
    console.log(this.waypoints);
    this.waypointsBehavior.next([...this.waypoints]);
  }

  getPlansOption(status: any, userId: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIS[6], {
      params: new HttpParams()
        .set('status', status)
        .set('user_id', userId)
    });
  }
}
