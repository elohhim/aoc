import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventKey } from 'src/shared/model/event-key';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsComponent {
  eventKey$: Observable<EventKey> = this.eventKeyProvider.eventKey$;

  constructor(private eventKeyProvider: EventKeyProviderComponent) {}
}
