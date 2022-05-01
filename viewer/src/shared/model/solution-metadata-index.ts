import { Language } from './language';
import { SolutionMetadata } from './solution-metadata';

/**
 * Leverage TS type system for generated meta data validation
 */
export interface SolutionMetadataIndex {
  [event: number]: {
    [day: number]: {
      [language in Language]?: SolutionMetadata;
    };
  };
}
