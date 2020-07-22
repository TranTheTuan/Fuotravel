import {Injectable} from '@angular/core';
import {MemberService} from '../services/member.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipResolver implements Resolve<any> {
  constructor(
    private memberService: MemberService,
    private authService: AuthService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (!this.authService.currentUserValue) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    const planId = route.paramMap.get('plan_id');
    this.memberService.getMembership(planId);
    return this.memberService.getMembershipListener().pipe(first());
  }
}
