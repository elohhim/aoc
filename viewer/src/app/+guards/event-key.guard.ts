import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IndexService } from '../+service/index.service';
import { ParamsResolveService } from '../+service/params-resolve.service';

export const eventKeyGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const indexService = inject(IndexService);
  const paramsResolveService = inject(ParamsResolveService);

  const eventKey = paramsResolveService.resolveEventKey(route.params);
  return indexService.isValidEventKey(eventKey);
};
