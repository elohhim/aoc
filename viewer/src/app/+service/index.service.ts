import { Injectable } from '@angular/core';
import { SOLUTIONS_METADATA } from 'src/data/metadata';
import { EventKey } from 'src/shared/model/event-key';
import { FileMetadata } from 'src/shared/model/file-metadata';
import { Language } from 'src/shared/model/language';
import { SolutionKey } from 'src/shared/model/solution-key';
import { SolutionMetadataIndex } from 'src/shared/model/solution-metadata-index';
import { SolutionMetadataRecord } from 'src/shared/model/solution-metadata-record';
import { getOrCompute } from '../lib/get-or-compute';

/**
 * Bridges between generated solutions metadata and Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class IndexService {
  readonly index: SolutionMetadataIndex;

  constructor() {
    this.index = this.buildIndex(SOLUTIONS_METADATA);
  }

  getEventKeys(): EventKey[] {
    const keys: EventKey[] = [];
    for (let [event, eventIndex] of this.index.entries()) {
      for (let day of eventIndex.keys()) {
        keys.push({ event, day });
      }
    }
    return keys.sort((k1, k2) =>
      k1.event !== k2.event ? k1.event - k2.event : k1.day - k2.day
    );
  }

  getSolutionLanguages({ event, day }: EventKey): Language[] {
    const keys = this.index.get(event)?.get(day)?.keys();
    return keys !== undefined ? [...keys] : [];
  }

  getSolutionFiles({ event, day, language }: SolutionKey): FileMetadata[] {
    return this.index.get(event)?.get(day)?.get(language)?.files ?? [];
  }

  isValidEventKey({ event, day }: EventKey): boolean {
    return this.index.get(event)?.get(day) !== undefined;
  }

  isValidSolutionKey({ event, day, language }: SolutionKey): boolean {
    return this.index.get(event)?.get(day)?.get(language) !== undefined;
  }

  buildIndex(records: SolutionMetadataRecord[]): SolutionMetadataIndex {
    const index: SolutionMetadataIndex = new Map();
    for (let { key, metadata } of records) {
      const { event, day, language } = key;
      getOrCompute(
        getOrCompute(index, event, () => new Map()),
        day,
        () => new Map()
      ).set(language, metadata);
    }
    return index;
  }
}
