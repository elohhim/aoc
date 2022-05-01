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
    // TODO: 2022-04-23 jk - I don't like lack of typing here
    return SOLUTIONS_METADATA.map((record) => record.key);
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
