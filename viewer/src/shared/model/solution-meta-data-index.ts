import { Language } from './language';
import { SolutionMetaData } from './solution-meta-data';

/**
 * Leverage TS type system for generated meta data validation
 */
export interface SolutionMetaDataIndex {
  [event: number]: {
    [day: number]: {
      [language in Language]?: SolutionMetaData;
    };
  };
}
