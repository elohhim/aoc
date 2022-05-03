import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SolutionKey } from 'src/shared/model/solution-key';
import { IndexService } from '../+service/index.service';
import { ParamsResolveService } from '../+service/params-resolve.service';

@Injectable({
  providedIn: 'root',
})
export class SolutionKeyGuard implements CanActivate {
  constructor(
    private indexService: IndexService,
    private paramsResolveService: ParamsResolveService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const solutionKey: SolutionKey = {
      ...this.paramsResolveService.resolveEventKey(route.params),
      language: this.paramsResolveService.resolveLanguage(route.params),
    };
    return this.indexService.isValidSolutionKey(solutionKey);
  }
}