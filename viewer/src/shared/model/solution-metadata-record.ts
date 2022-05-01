import { SolutionKey } from './solution-key';
import { SolutionMetadata } from './solution-metadata';
import { SolutionMetadataIndex } from './solution-metadata-index';

export interface SolutionMetadataRecord {
  key: SolutionKey;
  metadata: SolutionMetadata;
}

export function toIndex(
  records: SolutionMetadataRecord[]
): SolutionMetadataIndex {
  const index: SolutionMetadataIndex = {};
  for (let { key, metadata } of records) {
    const { event, day, language } = key;
    if (index[event] === undefined) {
      index[event] = {};
    }
    if (index[event][day] === undefined) {
      index[event][day] = {};
    }
    index[event][day][language] = metadata;
  }
  return index;
}
