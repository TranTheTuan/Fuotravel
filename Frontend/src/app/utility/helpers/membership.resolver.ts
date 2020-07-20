import {Injectable} from '@angular/core';
import {MemberService} from '../services/member.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembershipResolver implements Resolve<any> {
  constructor(
    private memberService: MemberService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const planId = route.paramMap.get('plan_id');
    this.memberService.getMembership(planId);
    return this.memberService.getMembershipListener().pipe(first());
  }
}
