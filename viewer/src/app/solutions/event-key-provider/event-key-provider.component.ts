import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { ParamsResolveService } from 'src/app/+service/params-resolve.service';
import { EventKey } from 'src/shared/model/event-key';

@Component({
  selector: 'app-event-key-provider',
  templateUrl: './event-key-provider.component.html',
  styleUrls: ['./event-key-provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventKeyProviderComponent {
  readonly eventKey$: Observable<EventKey> = this.activatedRoute.params.pipe(
    map((params) => this.paramsResolveService.resolveEventKey(params)),
    distinctUntilChanged()
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private paramsResolveService: ParamsResolveService
  ) {}
}
