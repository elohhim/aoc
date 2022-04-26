import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  tap,
} from 'rxjs';
import { ParamsResolveService } from 'src/app/+service/params-resolve.service';
import { SolutionKey } from 'src/shared/model/solution-key';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';

@Component({
  selector: 'app-solution-key-provider',
  templateUrl: './solution-key-provider.component.html',
  styleUrls: ['./solution-key-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionKeyProviderComponent implements OnInit {
  readonly solutionKey$: Observable<SolutionKey> = combineLatest([
    this.eventKeyProvider.eventKey$,
    this.activatedRoute.params,
  ]).pipe(
    map(([eventKey, params]) => ({
      ...eventKey,
      language: this.paramsResolveService.resolveLanguage(params),
    })),
    distinctUntilChanged()
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventKeyProvider: EventKeyProviderComponent,
    private paramsResolveService: ParamsResolveService
  ) {}

  ngOnInit(): void {}
}
