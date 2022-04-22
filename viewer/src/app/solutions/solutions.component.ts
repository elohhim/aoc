import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EventKey } from 'src/shared/model/event-key';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsComponent implements OnInit {
  eventKey$: Observable<EventKey> = this.activatedRoute.params.pipe(
    map((params) => this.parseParams(params))
  );

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  parseParams(params: Params): EventKey {
    const { event, day } = params;
    if (typeof event === 'string' && typeof day === 'string') {
      return {
        event: parseInt(event),
        day: parseInt(day),
      };
    }
    throw new Error(`[${this.constructor.name}] Invalid route params`);
  }
}
