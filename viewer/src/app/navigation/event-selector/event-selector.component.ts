import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { getOrCompute } from 'src/app/lib/get-or-compute';
import { EventKey } from 'src/shared/model/event-key';
import { IndexService } from '../../+service/index.service';

@Component({
  selector: 'app-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSelectorComponent implements OnInit {
  eventKeys: EventKey[] = [];
  readonly keysByEvent: Map<number, EventKey[]> = new Map();

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    this.eventKeys = this.indexService.getEventKeys();
    for (let key of this.eventKeys) {
      getOrCompute(this.keysByEvent, key.event, () => []).push(key);
    }
  }
}
