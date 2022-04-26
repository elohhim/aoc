import { Injectable } from '@angular/core';
import { SOLUTIONS_DATA } from 'src/data/data';
import { EventKey } from 'src/shared/model/event-key';
import { FileMetaData } from 'src/shared/model/file-meta-data';
import { Language } from 'src/shared/model/language';
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

  getSolutionLanguages({ event, day }: EventKey): Language[] {
    // TODO: 2022-04-25 jk - again lack of typing :/
    return Object.keys(SOLUTIONS_DATA[event][day]) as Language[];
  }

  getSolutionFiles({ event, day, language }: SolutionKey): FileMetaData[] {
    return SOLUTIONS_DATA[event][day][language]?.files ?? [];
  }

  isValidEventKey({ event, day }: EventKey): boolean {
    return SOLUTIONS_DATA[event]?.[day] !== undefined;
  }

  isValidSolutionKey({ event, day, language }: SolutionKey): boolean {
    return SOLUTIONS_DATA[event]?.[day]?.[language] !== undefined;
  }
}
