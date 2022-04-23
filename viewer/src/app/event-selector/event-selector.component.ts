import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventKey } from 'src/shared/model/event-key';
import { IndexService } from '../+service/index.service';

@Component({
  selector: 'app-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSelectorComponent implements OnInit {
  eventKeys: EventKey[] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    this.eventKeys = this.indexService.getEventKeys();
  }
}
