import { Language } from './language';
import { SolutionMetadata } from './solution-metadata';

export type SolutionMetadataIndex = Map<
  number,
  Map<number, Map<Language, SolutionMetadata>>
>;
