import { Day } from './event-key';
import { Language } from './language';
import { SolutionMetadata } from './solution-metadata';

export type SolutionMetadataIndex = Map<
  number,
  Map<Day, Map<Language, SolutionMetadata>>
>;
