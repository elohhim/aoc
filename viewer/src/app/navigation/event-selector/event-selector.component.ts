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
  keysByEvent: [number, EventKey[]][] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    const keysByEventMap: Map<number, EventKey[]> = new Map();
    for (let key of this.indexService.getEventKeys()) {
      getOrCompute(keysByEventMap, key.event, () => []).push(key);
    }
    this.keysByEvent = [...keysByEventMap.entries()].sort(
      ([e1], [e2]) => e2 - e1
    );
  }
}
