import { Injectable } from '@angular/core';
import { SOLUTIONS_METADATA } from 'src/data/metadata';
import { EventKey } from 'src/shared/model/event-key';
import { FileMetadata } from 'src/shared/model/file-metadata';
import { Language } from 'src/shared/model/language';
import { SolutionKey } from 'src/shared/model/solution-key';
import { SolutionMetadataIndex } from 'src/shared/model/solution-metadata-index';
import { toIndex } from 'src/shared/model/solution-metadata-record';

/**
 * Bridges between generated solutions index and Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class IndexService {
  readonly index: SolutionMetadataIndex;

  constructor() {
    this.index = toIndex(SOLUTIONS_METADATA);
  }

  getEventKeys(): EventKey[] {
    // TODO: 2022-04-23 jk - I don't like lack of typing here
    return SOLUTIONS_METADATA.map((record) => record.key);
  }

  getSolutionLanguages({ event, day }: EventKey): Language[] {
    // TODO: 2022-04-25 jk - again lack of typing :/
    return Object.keys(this.index[event][day]) as Language[];
  }

  getSolutionFiles({ event, day, language }: SolutionKey): FileMetadata[] {
    return this.index[event][day][language]?.files ?? [];
  }

  isValidEventKey({ event, day }: EventKey): boolean {
    return this.index[event]?.[day] !== undefined;
  }

  isValidSolutionKey({ event, day, language }: SolutionKey): boolean {
    return this.index[event]?.[day]?.[language] !== undefined;
  }
}
