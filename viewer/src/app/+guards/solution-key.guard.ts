import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SolutionKey } from 'src/shared/model/solution-key';
import { IndexService } from '../+service/index.service';
import { ParamsResolveService } from '../+service/params-resolve.service';

export const solutionKeyGuard = (route: ActivatedRouteSnapshot) => {
  const indexService = inject(IndexService);
  const paramsResolveService = inject(ParamsResolveService);

  const solutionKey: SolutionKey = {
    ...paramsResolveService.resolveEventKey(route.params),
    language: paramsResolveService.resolveLanguage(route.params),
  };
  return indexService.isValidSolutionKey(solutionKey);
};
