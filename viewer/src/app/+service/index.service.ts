import { Injectable } from '@angular/core';
import { SOLUTIONS_DATA } from 'src/data/data';
import { AssetPaths } from 'src/shared/model/asset-path';
import { EventKey } from 'src/shared/model/event-key';
import { SolutionKey } from 'src/shared/model/solution-key';

/**
 * Bridges between generated solutions index and Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor() {}

  getEventKeys(): EventKey[] {
    // TODO: 2022-04-23 jk - I don't like lack of typing here
    return Object.entries(SOLUTIONS_DATA).flatMap(([event, days]) =>
      Object.keys(days).map((day) => ({
        event: parseInt(event),
        day: parseInt(day),
      }))
    );
  }

  getAssetPaths({ event, day, language }: SolutionKey): AssetPaths {
    return SOLUTIONS_DATA[event][day][language] ?? [];
  }
}
