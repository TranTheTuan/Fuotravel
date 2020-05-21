import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiResponse} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FOLLOWING, MEMBER, PENDING} from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private APIS = {
    1: environment.apiURL + '/members/requesters/{plan_id}',
    2: environment.apiURL + '/members/joined/{plan_id}',
    3: environment.apiURL + '/members/admin/accept/{user_id}/{plan_id}',
    4: environment.apiURL + '/members/admin/decline/{user_id}/{plan_id}',
    5: environment.apiURL + '/members/admin/ban/{user_id}/{plan_id}',
    6: environment.apiURL + '/members/admin/kick/{user_id}/{plan_id}',
    7: environment.apiURL + '/members/admin/promote/{user_id}/{plan_id}/{role}',
    8: environment.apiURL + '/members/admin/discharge/{user_id}/{plan_id}/{role}',
    9: environment.apiURL + '/members/join/{plan_id}',
    10: environment.apiURL + '/members/unfollow/{plan_id}',
    11: environment.apiURL + '/members/membership/{plan_id}',
    12: environment.apiURL + '/members/leave/{plan_id}',
    13: environment.apiURL + '/members/follow/{plan_id}',
  };
  membership: Array<number>;
  membership$ = new BehaviorSubject<Array<number>>([]);

  constructor(private http: HttpClient) {
  }

  getMembership(planId: any) {
    const apiUrl = this.APIS[11].replace('{plan_id}', planId);
    this.http.get<ApiResponse>(apiUrl).subscribe(res => {
      this.membership = res.data;
      this.membership$.next([...this.membership]);
    });
  }

  getMembershipListener() {
    return this.membership$.asObservable();
  }

  getMembers(planId: any, memberType: number): Observable<ApiResponse> {
    let apiUrl = '';
    if (memberType === PENDING) {
      apiUrl = this.APIS[1];
    } else {
      apiUrl = this.APIS[2];
    }
    apiUrl = apiUrl.replace('{plan_id}', planId);
    return this.http.get<ApiResponse>(apiUrl)
      .pipe(map(res => {
        return res;
      }));
  }

  accept(userId: any, planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[3].replace('{user_id}', userId)
      .replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  decline(userId: any, planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[4].replace('{user_id}', userId)
      .replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  ban(userId: any, planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[5].replace('{user_id}', userId)
      .replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  kick(userId: any, planId: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[6].replace('{user_id}', userId)
      .replace('{plan_id}', planId);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  promote(userId: any, planId: any, role: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[7].replace('{user_id}', userId)
      .replace('{plan_id}', planId)
      .replace('{role}', role);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  discharge(userId: any, planId: any, role: any): Observable<ApiResponse> {
    const apiUrl = this.APIS[8].replace('{user_id}', userId)
      .replace('{plan_id}', planId)
      .replace('{role}', role);
    return this.http.post<ApiResponse>(apiUrl, null)
      .pipe(map(res => {
        return res;
      }));
  }

  join(planId: any) {
    const apiUrl = this.APIS[9].replace('{plan_id}', planId);
    this.http.post<ApiResponse>(apiUrl, null)
      .subscribe(res => {
        if (res.data) {
          this.membership = [1, 2];
          this.membership$.next([...this.membership]);
        }
      });
  }

  unfollow(planId: any) {
    const apiUrl = this.APIS[10].replace('{plan_id}', planId);
    this.http.post<ApiResponse>(apiUrl, null)
      .subscribe(res => {
        const updatedMembership = [...this.membership];
        const index = updatedMembership.indexOf(FOLLOWING);
        updatedMembership.splice(index, 1);
        this.membership = updatedMembership;
        this.membership$.next([...this.membership]);
      });
  }

  follow(planId: any) {
    const apiUrl = this.APIS[13].replace('{plan_id}', planId);
    this.http.post<ApiResponse>(apiUrl, null)
      .subscribe(res => {
        const updatedMembership = [...this.membership];
        updatedMembership.push(FOLLOWING);
        this.membership = updatedMembership;
        this.membership$.next([...this.membership]);
      });
  }

  leave(planId: any) {
    const apiUrl = this.APIS[12].replace('{plan_id}', planId);
    this.http.post<ApiResponse>(apiUrl, null)
      .subscribe(res => {
        if (res.data) {
          this.membership.length = 0;
          this.membership$.next([...this.membership]);
        }
      });
  }
}
