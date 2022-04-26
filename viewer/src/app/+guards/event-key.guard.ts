import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IndexService } from '../+service/index.service';
import { ParamsResolveService } from '../+service/params-resolve.service';

@Injectable({
  providedIn: 'root',
})
export class EventKeyGuard implements CanActivate {
  constructor(
    private indexService: IndexService,
    private paramsResolveService: ParamsResolveService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const eventKey = this.paramsResolveService.resolveEventKey(route.params);
    return this.indexService.isValidEventKey(eventKey);
  }
}
